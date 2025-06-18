import { useState } from "react";

function Step({ emoji, title, text, overlayClass }) {
  const [origin, setOrigin] = useState(null);   
  const [isHover, setIsHover] = useState(false);

  function getEntrySide(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const dist = {
      left: x,
      right: r.width - x,
      top: y,
      bottom: r.height - y,
    };
    return Object.entries(dist).sort((a, b) => a[1] - b[1])[0][0];
  }

  function handleEnter(e) {
    setOrigin(getEntrySide(e));
    setIsHover(true);
  }
  function handleLeave() {
    setIsHover(false);
  }

  const base = `absolute inset-0 ${overlayClass} transition-transform duration-300 ease-out pointer-events-none`;
  let init = "";
  let active = "";

  switch (origin) {
    case "left":
      init = "scale-x-0 origin-left";
      active = "scale-x-100";
      break;
    case "right":
      init = "scale-x-0 origin-right";
      active = "scale-x-100";
      break;
    case "top":
      init = "scale-y-0 origin-top";
      active = "scale-y-100";
      break;
    case "bottom":
      init = "scale-y-0 origin-bottom";
      active = "scale-y-100";
      break;
    default:
      init = "scale-x-0 origin-left";
  }

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative flex flex-col items-center space-y-4
                 bg-gray-800/60 p-8 rounded-xl shadow-lg
                 cursor-pointer overflow-hidden"
    >
      <div className={`${base} ${isHover ? active : init}`} />

      <span className="text-6xl relative z-10">{emoji}</span>
      <h3 className="text-2xl font-semibold relative z-10">{title}</h3>
      <p className="max-w-[18rem] leading-relaxed text-gray-300 relative z-10">
        {text}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      emoji: "🎨",
      title: "See Today’s Design",
      text:
        "Every 24 hours we unveil a brand‑new AI‑generated tee design, available for one day only!",
      overlay: "bg-amber-400/80",          // bright amber
    },
    {
      emoji: "🛒",
      title: "Buy the Tee",
      text:
        "Secure your limited‑edition shirt and wear an artwork that’s truly one‑of‑a‑kind.",
      overlay: "bg-blue-500/80",          // bright blue
    },
    {
      emoji: "❤️",
      title: "Support the Charity",
      text:
        "A portion of each purchase goes straight to the featured charity, helping those in need.",
      overlay: "bg-red-600/80",            // bright red
    },
  ];

  return (
    <section 
    id="how-it-works"
    className="mx-auto my-20 max-w-5xl px-6 py-12 text-center text-white">
      <h2 className="mb-14 text-4xl font-extrabold tracking-tight">
        How&nbsp;It&nbsp;Works
      </h2>

      <div className="grid gap-12 sm:grid-cols-3">
        {steps.map((s, i) => (
          <Step key={i} emoji={s.emoji} title={s.title} text={s.text} overlayClass={s.overlay} />
        ))}
      </div>
    </section>
  );
}
