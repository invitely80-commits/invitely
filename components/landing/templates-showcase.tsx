"use client";

import Link from "next/link";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sampleInvite } from "@/lib/invites";

import { InviteRenderer, type TemplateInvite } from "@/components/templates/render-invite";

const previewTemplates: TemplateInvite[] = [
  {
    id: "minimal-preview",
    slug: "aarohi-vihaan-demo",
    template: "minimal",
    data: sampleInvite,
  },
  {
    id: "royal-preview",
    slug: "aarohi-vihaan-demo-royal",
    template: "royal",
    data: {
      ...sampleInvite,
      theme: "royal",
    },
  },
];

export function TemplatesShowcase() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateInvite | null>(null);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
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
                    {template.template === "royal" ? "Royal Heritage" : "Modern Minimal"}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-stone-500/90">
                    {template.template === "royal"
                      ? "A burgundy-and-gold statement for grand celebrations."
                      : "An airy editorial style with graceful spacing and soft romance."}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="shrink-0 px-5"
                  onClick={() => setActiveTemplate(template)}
                >
                  <Eye className="size-4" />
                  Preview
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeTemplate ? (
          <motion.div
            className="fixed inset-0 z-[100] bg-burgundy/40 px-4 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTemplate(null)}
          >
            <motion.div
              className="mx-auto h-full max-w-6xl overflow-y-auto rounded-[48px] bg-ivory p-6 shadow-[0_40px_120px_rgba(87,0,19,0.3)]"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-burgundy/40">
                    Template Showcase
                  </p>
                  <h3 className="mt-1 font-heading text-3xl font-medium text-burgundy">
                    {activeTemplate.template === "royal" ? "Royal Heritage" : "Modern Minimal"}
                  </h3>
                </div>
                <Button variant="ghost" onClick={() => setActiveTemplate(null)} size="sm">
                  Close Preview
                </Button>
              </div>
              <InviteRenderer invite={activeTemplate} preview />
              <div className="flex justify-end px-4 pb-4 pt-8">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-burgundy/80 hover:text-burgundy transition-colors"
                >
                  Start creating with this design
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

