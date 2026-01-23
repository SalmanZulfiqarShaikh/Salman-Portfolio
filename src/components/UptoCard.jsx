import React from "react";
import { useTheme } from "../contexts/theme";

function UptoCard({ title, points, icon: Icon }) {
  const { themeMode } = useTheme();

  // Dynamic colors
  const cardBg = themeMode === "dark" ? "bg-[#1a1a1a]" : "bg-[#fffdf9]";
  const hoverBg = themeMode === "dark" ? "hover:bg-[#2a2a2a]" : "hover:bg-[#bfa980]/10";
  const borderColor = themeMode === "dark" ? "border-[#bfa980]/30" : "border-[#bfa980]/40";
  const titleColor = themeMode === "dark" ? "text-white" : "text-[#0d0d0d]";
  const textColor = themeMode === "dark" ? "text-white/90" : "text-[#0d0d0d]/90";
  const pointColor = themeMode === "dark" ? "text-white" : "text-[#0d0d0d]";
  const iconBg = themeMode === "dark" ? "bg-[#bfa980] border-[#bfa980]" : "bg-[#bfa980] border-[#bfa980]";
  const iconColor = themeMode === "dark" ? "text-[#0d0d0d]" : "text-[#0d0d0d]";

  return (
    <div className={`flex gap-6 border ${borderColor} rounded-2xl p-6 ${cardBg} ${hoverBg} transition-all duration-300 shadow-sm hover:shadow-md`}>
      {/* Circular Icon */}
      <div className="flex-shrink-0">
        <div className={`w-16 h-16 flex items-center justify-center rounded-full border-2 ${iconBg} ${iconColor}`}>
          <Icon className="text-xl" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h2 className={`text-2xl font-serif font-semibold ${titleColor} mb-4 transition-colors duration-300`}>
          {title}
        </h2>
        <ul className="space-y-2">
          {points.map((point, i) => (
            <li
              key={i}
              className={`${textColor} font-medium tracking-wide leading-relaxed transition-colors duration-300`}
            >
              ↳ <span className={`font-semibold ${pointColor}`}>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UptoCard;