import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-[linear-gradient(135deg,var(--color-burgundy)_0%,var(--color-burgundy-container)_100%)] text-white shadow-[0_24px_50px_rgba(87,0,19,0.18)] hover:brightness-110 focus-visible:outline-burgundy",
  secondary:
    "bg-gold-fixed text-gold ring-1 ring-gold/10 hover:bg-gold-fixed/90 focus-visible:outline-gold",
  ghost:
    "bg-transparent text-burgundy hover:bg-burgundy/5 focus-visible:outline-burgundy",
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
