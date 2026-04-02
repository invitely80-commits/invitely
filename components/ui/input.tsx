import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full border-b border-burgundy/10 bg-transparent px-0 text-[15px] font-medium text-stone-900 outline-none transition placeholder:text-stone-300 focus:border-gold focus:border-b-2",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";

