import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Journey from "@/components/Journey";
import Strengths from "@/components/Strengths";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Journey />
      <Strengths />
      <Projects />
      <Certificates />
      <Contact />
    </main>
  );
}
