// src/components/ui/AlertDialog.tsx
"use client";
import { Modal } from "./Modal";
import { Button } from "./Button";

export function AlertDialog({ open, onClose, title, description, onConfirm }: { open: boolean; onClose: () => void; title: string; description?: string; onConfirm: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      {description && <p className="text-sm text-secondary mb-4">{description}</p>}
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onClose}>لغو</Button>
        <Button variant="destructive" onClick={() => { onConfirm(); onClose(); }}>تأیید</Button>
      </div>
    </Modal>
  );
}
