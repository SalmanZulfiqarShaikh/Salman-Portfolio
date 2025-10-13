import React from "react";

function UptoCard({ title, points, icon: Icon }) {
  return (
    <div className="flex gap-6 border border-[#bfa980]/40 rounded-2xl p-6 bg-[#fffdf9] hover:bg-[#bfa980]/10 transition-all duration-300 shadow-sm hover:shadow-md">
      {/* Circular Icon */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-[#bfa980] bg-[#bfa980] text-[#0d0d0d]">
          <Icon className="text-xl" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h2 className="text-2xl font-serif font-semibold text-[#0d0d0d] mb-4">
          {title}
        </h2>
        <ul className="space-y-2">
          {points.map((point, i) => (
            <li
              key={i}
              className="text-[#0d0d0d]/90 font-medium tracking-wide leading-relaxed"
            >
              ↳ <span className="font-semibold text-[#0d0d0d]">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UptoCard;
