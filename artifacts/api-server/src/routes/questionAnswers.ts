import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

interface AnswerRecord {
  questionId: number;
  question: string;
  answerIndex: number;
  answer: string;
}

interface AnswerSubmission {
  submittedAt: string;
  answers: AnswerRecord[];
}

const router: IRouter = Router();

const readString = (value: unknown, maxLength: number): string | null => {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  return trimmed.slice(0, maxLength);
};

const readNumber = (value: unknown): number | null => {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;

  return value;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getExpectedCount = (): number => {
  const rawCount = Number(process.env["ANSWERS_EXPECTED_COUNT"] ?? "6");

  return Number.isFinite(rawCount) && rawCount > 0 ? rawCount : 6;
};

const isConfiguredSecret = (value: string | undefined): value is string =>
  Boolean(value && value !== "PUT_GMAIL_APP_PASSWORD_HERE" && value !== "your-app-password");

const parseSubmission = (body: unknown): AnswerSubmission | null => {
  if (!body || typeof body !== "object") return null;

  const record = body as Record<string, unknown>;
  const submittedAt =
    readString(record["submittedAt"], 80) ?? new Date().toISOString();
  const answers = record["answers"];
  const expectedCount = getExpectedCount();

  if (!Array.isArray(answers) || answers.length !== expectedCount) {
    return null;
  }

  const parsedAnswers: AnswerRecord[] = [];

  for (const rawAnswer of answers) {
    if (!rawAnswer || typeof rawAnswer !== "object") return null;

    const answerRecord = rawAnswer as Record<string, unknown>;
    const questionId = readNumber(answerRecord["questionId"]);
    const answerIndex = readNumber(answerRecord["answerIndex"]);
    const question = readString(answerRecord["question"], 500);
    const answer = readString(answerRecord["answer"], 500);

    if (
      questionId === null ||
      answerIndex === null ||
      question === null ||
      answer === null
    ) {
      return null;
    }

    parsedAnswers.push({
      questionId,
      question,
      answerIndex,
      answer,
    });
  }

  return {
    submittedAt,
    answers: parsedAnswers,
  };
};

const renderTextEmail = (
  submission: AnswerSubmission,
  ipAddress: string | undefined,
  userAgent: string | undefined,
): string => {
  const lines = [
    "وصلت إجابات جديدة من صفحة الأسئلة.",
    "",
    `الوقت: ${submission.submittedAt}`,
    `IP: ${ipAddress ?? "غير معروف"}`,
    `User-Agent: ${userAgent ?? "غير معروف"}`,
    "",
    ...submission.answers.flatMap((answer) => [
      `سؤال ${answer.questionId}: ${answer.question}`,
      `الإجابة: ${answer.answer}`,
      "",
    ]),
  ];

  return lines.join("\n");
};

const renderHtmlEmail = (
  submission: AnswerSubmission,
  ipAddress: string | undefined,
  userAgent: string | undefined,
): string => {
  const rows = submission.answers
    .map(
      (answer) => `
        <tr>
          <td>${answer.questionId}</td>
          <td>${escapeHtml(answer.question)}</td>
          <td>${escapeHtml(answer.answer)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.7;">
      <h2>وصلت إجابات جديدة من صفحة الأسئلة</h2>
      <p><strong>الوقت:</strong> ${escapeHtml(submission.submittedAt)}</p>
      <p><strong>IP:</strong> ${escapeHtml(ipAddress ?? "غير معروف")}</p>
      <p><strong>User-Agent:</strong> ${escapeHtml(userAgent ?? "غير معروف")}</p>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>رقم</th>
            <th>السؤال</th>
            <th>الإجابة</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
};

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  let timeout: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => {
      reject(new Error(`Email send timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
};

router.post("/question-answers", async (req, res) => {
  const submission = parseSubmission(req.body);

  if (!submission) {
    return res.status(400).json({
      error: "Invalid question answers payload",
    });
  }

  const smtpHost = process.env["SMTP_HOST"];
  const smtpPort = Number(process.env["SMTP_PORT"] ?? "587");
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];
  const smtpFrom = process.env["SMTP_FROM"] ?? smtpUser;
  const emailTo = process.env["ANSWERS_EMAIL_TO"];

  if (!smtpHost || !smtpUser || !isConfiguredSecret(smtpPass) || !smtpFrom || !emailTo) {
    logger.warn("Question answer email is not configured");

    return res.status(503).json({
      error: "Question answer email is not configured",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number.isFinite(smtpPort) ? smtpPort : 587,
      secure: process.env["SMTP_SECURE"] === "true",
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const ipAddress = req.ip;
    const userAgent = req.get("user-agent");

    await withTimeout(
      transporter.sendMail({
        from: smtpFrom,
        to: emailTo,
        subject: "إجابات جديدة من صفحة الأسئلة",
        text: renderTextEmail(submission, ipAddress, userAgent),
        html: renderHtmlEmail(submission, ipAddress, userAgent),
      }),
      20_000,
    );

    return res.status(202).json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to send question answer email");

    return res.status(500).json({
      error: "Failed to send question answer email",
    });
  }
});

export default router;
