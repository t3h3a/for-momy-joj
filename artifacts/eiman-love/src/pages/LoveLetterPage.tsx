import { useState, useEffect } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";
const letterLines = [
  "سيدرا حبيبتي",
  "",
  "يمكن الموقع بسيط",
  "وكلامي يمكن يبين عادي",
  "بس والله اللي بقلبي الك مش بسيط ابدا 💕",
  "",
  "كل ليلة بفكر فيك وبصلاتي دايم بدعي الك وبنهاري وبكل وقتي سواء كنت فاضي او مشغول انتي ببالي وبحبك اكثر كل يوم ❤️",
  "",
  "بشوف فيك اشي ما شفته بحياتي اشي ما توقعت يوم احسه مع حدا فهمتيني يعني من اول ما دخلتي حياتي حسيت كل اشي تغير ✨",
  "",
  "حسيت انو حتتغير حياتي عن السابق بكثير شغلات سواء بايم فرحي و زعلي سواء بمشاكلي بحس انو يعني مجرد حرف منك كفيل يخليني اسعد مخلوق على وجه الارض",
  "",
  "بتعرفي وقت بنسهر انا و انتي بليل و بنضل نحكي و نضحك و ابوسك و تبوسيني و نتهبل ؟",
  "حرفيا بكون اجمل شي بصير معي مش مشان شي بس لانو منك انتي لو كان غيرك كنت اصلا مادخلت بس انتي غير انتي اميرتي و قلبي و نور عيني و نور دربي فرحتي و ضحكتي و كل مايخصني و يتعلق فيني كياتك ماصارت بلحياة كلها",
  "",
  "قد ماحكيتلك قد ماوصفت الك قد ايش انتي حبوبه و قد ايش انتي قلبي و قد ايش بحبك ماقدرت اوفي حبي الك حقو او اوفق جمالك حقه",
  "",
  "دايما بسمع بكثير اماكن انو بقولو مافي شي بلكون الا فيلو وصف و فيلو معنى انتي اجيتي خربتي كلامهم جمالك مستحيل ينوصف او حتى صفاتك او حتى طيبة قلبك او حتى جمال شفايفك و عيونك و شعراتك و رموشك و ضحكتك و ابتسامتك انتي وجودك بحيات حدا مين مكان كفيل يخلي حياتو من اسوء حياة الى اجمل حياة ليش طيب ؟ هل لانو هو معك لا بس لانك انتي يلي معو ضحكتك فرحتك كفيلات يخلو بعالم ثاني غير العالم يلي فيه احنا عالم غير فيو كلشي عباره عنك و عن حبي الك",
  "",
  "تخيلي بحياتي ماتوقعت يجي يوم احب حدا و يضل حبي يزيد و يزيد و يزيد يخي قد م يزيد بضل يزيد مع لوقت كل دقيقة لا كل ثانية لا كل لحضة بتمشي حبي بزيد ضعف اضعاف الحب يلي موجود لدرجه بحس حالي بدي انفجر حب هو فداك بس مابدي انفجر لانو بدي اضل معك و جنبك و سند الك و بدي اكون دايما معك ونتي فرحانه و انتي زعلانه و انتي معصبة و انتي مرضانة و انتي بردانة ليش ؟ لانو انتي أجمل و احلا و اطيب شي صار بحياتي و الشي الوحيد يلي مابندم علية بحياتي هو اني عرفتك و تعرفت عليك و حبيتك لانو حبك اجمل شي صارلي و ممكن يصير لاي حدا بعرفك مهم وصفت صدقيني مابوفي حبي الك حقو على قد ما بحبك و بحب كل تفاصيلك من شعرك ل اخر قطعة بجسمك",
  "",
  "صحيح بمناسبة عيد ميلادك كل عام و أنتي أجمل و اطيب وأحلا و انقى و ارقى و اكيت سيدرا عرفها الكون",
  "ربي يحفضك لي و يديمك بخير دايما و يخليك اميرة لي ويخلي ابتسامتك و كياتك و ضحكتك لي يا أجمل من انولدت",
  "صحح احيانا بشك انك بشرية بقول مستحيل يخي في بشري بهيك جمال معقول تكون من الحور العين متنكرة بس مابعرف لهيك خلص يا اجمل كائن على وجه الكون و يسعد اليوم يلي نولدت فيه لانو كان يوم نولدت احلى واجمل انسانة على مر الوجود",
  "",
  "بضحكتها",
  "",
  "وبفرحتها",
  "",
  "وبهبلها",
  "",
  "وبكل ما يخصها",
  "",
  "وبكل اشي فيها",
  "",
  "رح تضلي يا سيدرا نور عيوني ودنيتي ومسكني و الضو بعتمتي و كل ابتسامة حتكون بحياتي",
  "",
  "واحلى واجمل صدفة صارت بحياتي",
  "",
  "الصدفة اللي حرفيا صارت كل حياتي ❤️",
  "",
  "بحبك أميرتي بعرف مقصر بلوصف بس حاولت كثير مهما حاولت بضل وصفك مستحيل لانكك بكل لحضة بتمشي بتزيدي حلا و جمال و انا مش متعود يكون معي اي حد فما بالك انك انتي يلي كنتي معي بحبكككككك سيدرا 💕💋",
];

interface LoveLetterPageProps {
  onContinue: () => void;
}

export default function LoveLetterPage({ onContinue }: LoveLetterPageProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setVisibleLines(current);
      if (current >= letterLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setShowGlow(true);
        }, 800);
      }
    }, 380);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4">
      {/* Glow background */}
      <div
        className={`fixed inset-0 pointer-events-none transition-all duration-2000 ${
          showGlow ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,50,120,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Top decorations */}
      <div className="flex justify-between mb-4">
        <Ribbon color="pink" />
        <HelloKitty size={80} bow="red" />
        <Ribbon color="purple" />
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <p
          className="text-pink-300/60 text-sm"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          رسالتي الك
        </p>
        <h2
          className="shimmer-text font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
          }}
        >
          💌 من القلب
        </h2>
      </div>

      {/* Letter card */}
      <div
        className={`glass-card glow-border rounded-3xl p-6 max-w-lg mx-auto mb-8 relative overflow-hidden transition-all duration-1000 ${
          showGlow ? "animate-glow-pulse" : ""
        }`}
      >
        <div className="flex justify-center gap-2 mb-4">
          {["🌸", "💖", "🌸"].map((s, i) => (
            <span key={i} className="text-pink-300/60 text-sm">
              {s}
            </span>
          ))}
        </div>

        <div className="space-y-0.5" data-testid="text-letter">
          {letterLines.slice(0, visibleLines).map((line, idx) => (
            <p
              key={idx}
              className={`transition-all duration-500 leading-relaxed ${
                idx < visibleLines - 1 ? "opacity-100" : "opacity-80"
              } ${line === "" ? "h-4" : ""} ${
                line.startsWith("سيدرا حبيبتي") ? "text-pink-300 font-bold text-xl" : ""
              } ${
                line.includes("احبج يا عمري") ? "text-pink-400 font-bold text-lg" : "text-white/90"
              } ${
                line.includes("رح اختارك") ? "text-pink-300 font-bold" : ""
              }`}
              style={{
                fontFamily: "'Noto Naskh Arabic', sans-serif",
                fontSize: line === "" ? undefined : "clamp(0.95rem, 4vw, 1.1rem)",
                textAlign: "right",
                direction: "rtl",
                lineHeight: 1.9,
                overflowWrap: "anywhere",
                animationFillMode: "forwards",
              }}
            >
              {line}
              {idx === visibleLines - 1 && !done && <span className="typing-cursor" />}
            </p>
          ))}
        </div>

        {done && (
          <div
            className="mt-6 text-center animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex justify-center gap-2 mb-2">
              {["💖", "💕", "❤️", "💕", "💖"].map((h, i) => (
                <span
                  key={i}
                  className="animate-pulse-heart text-xl"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {h}
                </span>
              ))}
            </div>
            <p
              className="text-pink-300/70 text-sm"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem" }}
            >
              الك دايما ❤️
            </p>
          </div>
        )}
      </div>

      {done && (
        <div
          className="flex justify-center animate-fade-in-up"
          style={{ animationFillMode: "forwards" }}
        >
          <button
            data-testid="button-continue-letter"
            onClick={onContinue}
            className="btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl flex items-center justify-center gap-2"
            style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
          >
            <span>واصلي</span>
            <span className="animate-pulse-heart">💖</span>
          </button>
        </div>
      )}
    </div>
  );
}
