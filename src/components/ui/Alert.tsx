// src/components/ui/Alert.tsx
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/utils";

interface AlertProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
  className?: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, className, onClose }) => {
  const colors = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  };

  return (
    <div
      className={cn(
        "flex items-start justify-between p-4 border rounded-xl shadow-sm animate-fadeIn",
        colors[type],
        className
      )}
    >
      <p className="text-sm font-medium">{message}</p>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-foreground/60 hover:text-foreground transition">
          <X size={16} />
        </button>
      )}
    </div>
  );
};
