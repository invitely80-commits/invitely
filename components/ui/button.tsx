import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-maroon text-white shadow-[0_18px_50px_rgba(122,31,61,0.22)] hover:bg-[#65172f] focus-visible:outline-maroon",
  secondary:
    "bg-white/85 text-maroon ring-1 ring-maroon/15 hover:bg-white focus-visible:outline-maroon",
  ghost:
    "bg-transparent text-maroon hover:bg-maroon/5 focus-visible:outline-maroon",
};

const buttonSizes = {
  default: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  sm: "h-9 px-4 text-sm",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

export function buttonStyles({
  variant = "primary",
  size = "default",
  className,
}: {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={buttonStyles({ variant, size, className })} {...props} />
  ),
);

Button.displayName = "Button";
