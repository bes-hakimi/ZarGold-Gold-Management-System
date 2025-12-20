export function FilterPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-background-dark rounded-2xl p-4 shadow-card space-y-3">
      {children}
    </div>
  );
}