import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Journey from "@/components/Journey";
import Stories from "@/components/Stories";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Journey />
      <Stories />
      <Projects />
      <Certificates />
      <Contact />
    </main>
  );
}
