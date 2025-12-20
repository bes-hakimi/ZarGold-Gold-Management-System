// src/components/ui/Dropdown.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Item = { id: string; label: string; onClick?: () => void; icon?: React.ReactNode; disabled?: boolean; children?: Item[] };

export function Dropdown({ label, items, align = "left" }: { label: React.ReactNode; items: Item[]; align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button onClick={() => setOpen((s) => !s)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-secondary/20 bg-white dark:bg-background-dark">
        {label}
        <ChevronDown size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={cn("absolute mt-2 z-50 w-52 rounded-xl shadow-lg bg-white dark:bg-background-dark p-2", align === "right" ? "right-0" : "left-0")}
          >
            {items.map((it) => (
              <div key={it.id} className={cn("px-3 py-2 rounded-xl cursor-pointer hover:bg-primary/5 flex items-center gap-2", it.disabled && "opacity-50 cursor-not-allowed")}
                onClick={() => { if (!it.disabled) { it.onClick?.(); setOpen(false); } }}
              >
                {it.icon && <span>{it.icon}</span>}
                <span className="text-sm">{it.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
