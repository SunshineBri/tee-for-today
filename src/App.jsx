import { useEffect } from "react";
import Hero from "./components/Hero.jsx";
import CharitySpotlight from "./components/CharitySpotlight.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Decorations from "./components/Decorations.jsx";

export default function App() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-funGradient text-white flex flex-col overflow-x-hidden">

      <Decorations
        imageClass="bg-paint-splash"
        top="top-40"
        right="right-10"
        width="w-60"
        height="h-60"
        transitionDuration={700}
      />
      <Decorations
        imageClass="bg-order-now"
        top="top-[6rem]"
        left="left-2"
        width="w-[28rem]"
        height="h-[28rem]"
      />
      <Decorations
        imageClass="bg-paint-splash"
        top="top-[calc(100%-17rem)]"
        left="left-10"
        width="w-48"
        height="h-48"
      />

      <Navbar />

      <main className="flex-grow animate-fadeIn">
        <div className="max-w-6xl mx-auto px-4 space-y-24">
          <Hero />
          <CharitySpotlight />
          <HowItWorks />
        </div>
      </main>

      <Footer />
    </div>
  );
}
