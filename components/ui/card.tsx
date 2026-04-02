import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[40px] border border-burgundy/5 bg-white/60 p-8 shadow-[0_32px_80px_rgba(87,0,19,0.06)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}

