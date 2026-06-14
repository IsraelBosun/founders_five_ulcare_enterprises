import { testimonials } from "../data/site";

export default function Testimonials() {
  return (
    <section className="bg-[#F7F5F0] py-20 sm:py-28 border-t border-[#E0DDD5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-4">
          Love Letters
        </div>
        <h2 className="font-body font-bold text-[#1A1A12] text-3xl sm:text-4xl mb-12">
          What clients say.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#E0DDD5] p-8 sm:p-10 flex flex-col justify-between gap-8"
            >
              <p className="font-body text-[#1A1A12] text-lg sm:text-xl font-medium leading-[1.5]">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1A3828] flex items-center justify-center flex-shrink-0">
                    <span className="font-body text-white text-xs font-semibold">{t.initials}</span>
                  </div>
                  <div>
                    <div className="font-body text-[#1A1A12] text-sm font-semibold">{t.author}</div>
                    <div className="font-body text-[#A09B93] text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
                <span className="font-body text-[#A09B93] text-xs">{t.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
