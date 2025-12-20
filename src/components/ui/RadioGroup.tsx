export function RadioGroup<T>({ options, value, onChange }: { options: { label: string; value: T }[]; value?: T; onChange?: (v: T) => void }) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button key={String(o.value)} onClick={() => onChange?.(o.value)} className={`px-3 py-1 rounded-xl border ${o.value === value ? "bg-primary text-white border-primary" : "bg-white border-secondary/20"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}