"use client";

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
              <div className="flex items-center justify-between px-6 pb-6 pt-2">
                <div>
                  <h3 className="font-heading text-3xl text-maroon">
                    {template.template === "royal" ? "Royal Template" : "Minimal Template"}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    {template.template === "royal"
                      ? "A maroon-and-gold statement for grand Indian celebrations."
                      : "An airy editorial style with graceful spacing and soft romance."}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  className="shrink-0"
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
            className="fixed inset-0 z-50 bg-maroon/45 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTemplate(null)}
          >
            <motion.div
              className="mx-auto h-full max-w-6xl overflow-y-auto rounded-[36px] bg-ivory p-4 shadow-[0_30px_100px_rgba(58,14,30,0.25)]"
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-4 px-2 py-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-maroon/70">
                    Template Preview
                  </p>
                  <h3 className="font-heading text-3xl text-maroon">
                    {activeTemplate.template === "royal" ? "Royal Template" : "Minimal Template"}
                  </h3>
                </div>
                <Button variant="ghost" onClick={() => setActiveTemplate(null)}>
                  Close
                </Button>
              </div>
              <InviteRenderer invite={activeTemplate} preview />
              <div className="flex justify-end px-2 pb-2 pt-6">
                <a
                  href="/sign-up"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-maroon"
                >
                  Use this template
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

