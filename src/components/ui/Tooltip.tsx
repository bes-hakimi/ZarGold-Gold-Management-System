// src/components/ui/Tooltip.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/utils";

export function Tooltip({ children, content, side = "top" }: { children: React.ReactNode; content: React.ReactNode; side?: "top" | "bottom" | "left" | "right" }) {
  const [show, setShow] = useState(false);
  return (
    <div className="inline-block relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            className={cn("absolute z-50 max-w-xs p-2 rounded-md text-sm shadow-md bg-foreground text-white", side === "top" && "bottom-full mb-2 left-1/2 -translate-x-1/2", side === "bottom" && "top-full mt-2 left-1/2 -translate-x-1/2")}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
