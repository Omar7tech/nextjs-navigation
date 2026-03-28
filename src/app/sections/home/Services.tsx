export default function Services() {
  return (
    <section className="relative z-20 w-full px-6 md:px-10 py-12 md:py-16">
      
      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-16">
        {[
          { id: "01", title: "Development", desc: "Next.js, React, and performant server-side architectures." },
          { id: "02", title: "Motion Design", desc: "Interactive GSAP animations that bring interfaces to life." },
          { id: "03", title: "Strategy", desc: "Consulting on scalability, SEO, and technical roadmaps." }
        ].map((service) => (
          <div key={service.id} className="border-t border-white/10 pt-6">
            <span className="text-[#c5fb45] text-[10px] font-black tracking-widest mb-4 block">{service.id}</span>
            <h3 className="text-xl md:text-2xl uppercase font-bold mb-3">{service.title}</h3>
            <p className="text-xs md:text-sm opacity-40 leading-relaxed max-w-[300px]">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 md:mt-16 flex flex-col gap-6">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5fb45] font-black">Next Step</span>
        <button className="group relative w-fit text-[clamp(35px,7vw,90px)] uppercase font-bold tracking-tighter leading-none">
          <span className="block group-hover:-translate-y-2 transition-transform duration-500">Let&apos;s Talk</span>
          <div className="h-[2px] w-full bg-[#c5fb45] scale-x-100 md:scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mt-2" />
        </button>
      </div>
     
    </section>
  );
}
