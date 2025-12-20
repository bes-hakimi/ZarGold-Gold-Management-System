// src/components/ui/Skeleton.tsx
export function Skeleton({ className = "h-4 w-full rounded", count = 1 }: { className?: string; count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse bg-secondary/10 dark:bg-secondary/20 ${className}`} />
      ))}
    </div>
  );
}
