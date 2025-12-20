// src/components/ui/ToastProvider.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/utils";

type Toast = { id: string; title?: string; description?: string; type?: "success" | "error" | "info" };

const ToastContext = createContext<{ push: (t: Omit<Toast, "id">) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((s) => [...s, { id, ...t }]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4500);
  };

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div key={t.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className={cn("max-w-sm rounded-xl p-3 shadow-lg", t.type === "success" ? "bg-success/10 text-success" : t.type === "error" ? "bg-error/10 text-error" : "bg-primary/10 text-primary")}>
              {t.title && <div className="font-medium">{t.title}</div>}
              {t.description && <div className="text-sm">{t.description}</div>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
