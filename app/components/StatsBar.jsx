const stats = [
  { value: "50+", label: "Brands Built" },
  { value: "100%", label: "On-Time Delivery" },
  { value: "3", label: "Cities Served" },
  { value: "5.0★", label: "Client Rating" },
];

export default function StatsBar() {
  return (
    <div className="bg-white border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center py-2 ${i < stats.length - 1 ? "md:border-r md:border-[#E5E1D8]" : ""}`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#E8A045] mb-1">
                {stat.value}
              </div>
              <div className="text-[#6B6864] text-xs sm:text-sm font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
