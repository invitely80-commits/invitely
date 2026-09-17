"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";

import { deleteInviteAction } from "@/lib/actions/invite-actions";

export function DeleteInviteButton({
  inviteId,
  coupleNames,
}: {
  inviteId: string;
  coupleNames: string;
}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteInviteAction(inviteId);
      if (result.error) {
        alert(result.error);
        setIsConfirming(false);
      }
    });
  }

  if (isConfirming) {
    return (
      <div className="flex items-center gap-1.5 bg-red-50/90 border border-red-200/80 rounded-full px-2.5 py-1 text-xs">
        <span className="text-[10px] font-bold text-red-700">Delete permanently?</span>
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold text-white hover:bg-red-700 transition active:scale-95 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="size-3 animate-spin inline" /> : "Yes"}
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => setIsConfirming(false)}
          className="rounded-full bg-white border border-stone-200 px-2 py-0.5 text-[10px] font-medium text-stone-600 hover:text-stone-900 transition"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsConfirming(true)}
      title={`Delete ${coupleNames}`}
      className="inline-flex items-center justify-center size-9 rounded-full text-stone-400 hover:text-red-600 hover:bg-red-50/80 transition duration-200 active:scale-95"
    >
      <Trash2 className="size-3.5" />
    </button>
  );
}
