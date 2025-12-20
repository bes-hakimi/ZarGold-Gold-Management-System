// src/components/ui/Checkbox.tsx
export function Checkbox({ checked, onChange, disabled }: { checked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button onClick={() => !disabled && onChange?.(!checked)} className={`inline-flex items-center justify-center rounded-md p-1 border ${checked ? "bg-primary text-white border-primary" : "bg-white border-secondary/20"} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>
      {checked ? "✓" : ""}
    </button>
  );
}


