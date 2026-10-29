import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange/30 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-orange text-white hover:bg-orange-hover shadow-sm hover:shadow-md",
    outline:
      "border-2 border-coffee text-coffee hover:bg-coffee hover:text-white bg-transparent",
    secondary:
      "bg-tan text-espresso hover:bg-[#e6d3c0] shadow-sm",
    ghost:
      "text-coffee hover:bg-tan/40 bg-transparent",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 gap-2",
    lg: "text-base sm:text-lg px-6 py-3 gap-2.5",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
