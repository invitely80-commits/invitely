import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-maroon/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(122,31,61,0.08)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

