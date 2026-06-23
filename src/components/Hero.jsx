import { useState, useEffect, useRef } from "react"; 
import whiteShirt from "../assets/White-shirt-men.png"; 
import blackShirt from "../assets/Black-shirt-men.png";

const designImages = [
  "https://plus.unsplash.com/premium_photo-1747851400022-943f7163a4a2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1687987593515-041ff96bbc43?q=80&w=702&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1708034678252-ce866ca93b5d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/vector-1744442860865-0765bab8753c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const getTodaysDesign = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1); 
  const day = Math.floor((now - startOfYear) / 86_400_000); 
  return designImages[day % designImages.length];
};


function Modal({ onClose }) {
  return (
    <>
      <div
        className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2
                   bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      <div
        className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2
                   flex items-center justify-center z-50"
      >
        <div className="w-[22rem] rounded-xl bg-base p-8 text-center shadow-xl space-y-6">
          <h3 className="text-2xl font-bold">Coming Soon!</h3>
          <p className="text-gray-200">
            In the full product you’ll be able to purchase the daily tee here.
            For this demo, enjoy browsing the design 
          </p>
          <button
            onClick={onClose}
            className="mt-4 inline-block bg-primary hover:bg-pink-600
                       text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}


export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [shirtColor, setShirtColor] = useState("white");
  const [hoverColor, setHoverColor] = useState(null);
  const [designUrl] = useState(getTodaysDesign());
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);  
  const shirtRef = useRef(null);

  const previewColor = hoverColor || shirtColor;

  function getTimeLeft() {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return Math.max(midnight - Date.now(), 0);
  }
  const format = (ms) => new Date(ms).toISOString().substr(11, 8);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const check = () => setIsMobile(innerWidth < 768);
    check();
    addEventListener("resize", check);
    return () => removeEventListener("resize", check);
  }, []);
  useEffect(() => {
    if (!isMobile) return;
    const h = (e) =>
      shirtRef.current &&
      !shirtRef.current.contains(e.target) &&
      setIsActive(false);
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [isMobile]);

  const imgScale = `transition-transform duration-300 ${
    isActive ? "scale-105" : ""
  } group-hover:scale-105`;


  return (
    <section
      id="hero"
      className="relative pt-28 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8"
    >
      {/* ---------- shirt + overlay ---------- */}
      <div
        ref={shirtRef}
        onClick={() => isMobile && setIsActive((p) => !p)}
        className="relative w-80 md:w-96 aspect-[3/4] flex flex-col items-center group cursor-pointer select-none"
      >
        {/* base shirt */}
        <img
          src={previewColor === "white" ? whiteShirt : blackShirt}
          alt="Base T‑shirt"
          className={`w-full h-full object-contain ${imgScale}`}
        />

        {/* design overlay */}
        <img
          src={designUrl}
          alt="Design overlay"
          className={`absolute top-[30%] left-1/2 w-32 -translate-x-1/2 pointer-events-none select-none opacity-95 ${imgScale} ${
            previewColor === "black"
              ? "mix-blend-screen drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
              : "mix-blend-multiply"
          }`}
          style={{
            maskImage: `
              linear-gradient(to top, transparent 0%, black 3%, black 97%, transparent 100%),
              linear-gradient(to left, transparent 0%, black 3%, black 97%, transparent 100%)
            `,
            WebkitMaskComposite: "destination-in",
          }}
        />

        {/* color selectors */}
        <div className="mt-4 flex gap-4 z-10">
          {["white", "black"].map((c) => (
            <button
              key={c}
              aria-label={c}
              onClick={() => setShirtColor(c)}
              onMouseEnter={() => setHoverColor(c)}
              onMouseLeave={() => setHoverColor(null)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                previewColor === c
                  ? `${
                      c === "white"
                        ? "bg-white border-white"
                        : "bg-black border-black"
                    } ring-2 ring-offset-2 ring-white`
                  : `${
                      c === "white"
                        ? "bg-white border-white"
                        : "bg-black border-black"
                    } opacity-60 hover:opacity-100`
              }`}
            />
          ))}
        </div>
      </div>

      {/* ---------- description ---------- */}
      <div className="md:w-1/2 text-center md:text-left space-y-6 animate-fadeIn">
        <h1 className="text-6xl md:text-7xl font-extrabold uppercase tracking-wider bg-gradient-to-r from-highlight via-accent to-primary text-transparent bg-clip-text">
          Today’s Exclusive AI‑Designed T‑Shirt
        </h1>

        <p className="text-xl text-gray-200 leading-relaxed max-w-xl mx-auto md:mx-0">
          Grab this one‑of‑a‑kind tee before it's gone! Designed by AI and
          available for{" "}
          <span className="text-highlight font-bold">24 hours only</span>. A
          portion of each sale supports today’s featured charity.
        </p>

        <div className="text-2xl font-bold text-secondary animate-pulseSlow">
          New Tee Drops In :{" "}
          <span className="font-mono text-highlight font-extrabold">
            {format(timeLeft)}
          </span>
        </div>

        {/* ------------ BUY BUTTON ------------ */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white font-extrabold uppercase tracking-wide
                     px-8 py-4 rounded-lg shadow-xl ring-4 ring-highlight ring-opacity-80
                     flex items-center gap-2 justify-center
                     transition-transform duration-300 ease-out animate-pulseSlow
                     hover:scale-110 hover:-translate-y-1 hover:bg-pink-600 hover:animate-wiggle"
        >
          ⏰ Buy Today’s Tee
        </button>
      </div>

      {/* ------------ MODAL ------------ */}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </section>
  );
}
