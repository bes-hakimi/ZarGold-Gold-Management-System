// src/components/ui/Badge.tsx
import { cn } from "@/utils/utils";

type BadgeVariant = "success" | "warning" | "error" | "info";

export const Badge = ({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) => {
  const styles = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    info: "bg-primary/10 text-primary",
  };
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        styles[variant]
      )}
    >
      {children}
    </span>
  );
};
