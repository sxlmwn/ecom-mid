import React from "react";

interface SectionHeadingProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  tag?: string;
  align?: "center" | "left" | "right";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  title,
  subtitle,
  tag,
  align = "center",
  className = "",
  as: HeadingTag = "h2",
}: SectionHeadingProps) {
  const alignmentClasses = {
    center: "text-center mx-auto items-center",
    left: "text-left items-start",
    right: "text-right ml-auto items-end",
  };

  return (
    <div className={`flex flex-col max-w-2xl ${alignmentClasses[align]} ${className}`}>
      {tag && (
        <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-tan/80 text-coffee border border-coffee/10">
          {tag}
        </span>
      )}
      <HeadingTag className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-coffee tracking-tight">
        {title}
      </HeadingTag>
      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base text-espresso/75 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
      <div
        className={`w-12 h-1 bg-orange rounded-full mt-3.5 ${
          align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
        }`}
      />
    </div>
  );
}
