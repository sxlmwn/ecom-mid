import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className = "",
  hoverEffect = true,
}: CardProps) {
  return (
    <div
      className={`bg-white border border-tan rounded-2xl shadow-sm p-6 overflow-hidden ${
        hoverEffect
          ? "transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-orange/40"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
