import Hero from "./sections/home/Hero";
import Statement from "./sections/home/Statement";
import Services from "./sections/home/Services";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <Hero />
      <Statement />
      <Services />
    </main>
  );
}