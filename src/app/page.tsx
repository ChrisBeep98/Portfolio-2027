import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Marquee from "@/components/sections/Marquee";
import Process from "@/components/sections/Process";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <div className="relative z-10 bg-[#F2F2F0] dark:bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <Hero />
        <About />
        <Marquee />
        <Projects />
        <Process />
      </div>
      <Footer />
    </main>
  );
}
