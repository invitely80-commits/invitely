"use client";

import Link from "next/link";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";

import { Button, buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sampleInvite } from "@/lib/invites";

import { InviteRenderer, type TemplateInvite } from "@/components/templates/render-invite";

const previewTemplates: TemplateInvite[] = [
  {
    id: "heritage-preview",
    slug: "sofia-elias-heritage",
    template: "south-indian-heritage",
    data: {
      ...sampleInvite,
      theme: "south-indian-heritage",
      brideName: "Sofia",
      groomName: "Elias",
    },
  },
];

export function TemplatesShowcase() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateInvite | null>(null);

  return (
    <>
      <div className="max-w-xl mx-auto">
        {previewTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <Card className="group overflow-hidden p-0">
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 scale-[0.82] overflow-hidden rounded-[26px]">
                  <InviteRenderer invite={template} preview />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              </div>
              <div className="flex items-center justify-between px-8 pb-8 pt-4">
                <div>
                  <h3 className="font-heading text-3xl font-medium text-burgundy">
                    South Indian Heritage Wedding
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-stone-500/90">
                    Editorial luxury wedding stationery with delicate botanical foliage, ancestral family homes, and gold detailing.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setActiveTemplate(template)}
                  >
                    <Eye className="size-4" />
                    Preview
                  </Button>
                  <Link
                    href="/dashboard/invite/new?template=south-indian-heritage"
                    className={buttonStyles({ size: "sm", className: "rounded-full" })}
                  >
                    Use template
                    <ArrowUpRight className="size-4 ml-1" />
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeTemplate ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl bg-ivory p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-2xl text-burgundy">Template Preview</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTemplate(null)}
                >
                  Close
                </Button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-stone-200">
                <InviteRenderer invite={activeTemplate} preview />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
