import * as React from "react";

import { cn } from "@/lib/utils";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-1 block text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400", className)} {...props} />;
}

