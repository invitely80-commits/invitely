import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full rounded-2xl border border-maroon/10 bg-white px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-maroon/40 focus:ring-4 focus:ring-maroon/5",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";

