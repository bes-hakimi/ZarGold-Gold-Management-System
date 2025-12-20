// src/components/ui/Avatar.tsx
export function Avatar({ src, name, size = 40 }: { src?: string; name?: string; size?: number }) {
  const initials = name ? name.split(" ").map(s => s[0]).slice(0,2).join("") : "";
  return (
    <div style={{ width: size, height: size }} className="rounded-full overflow-hidden bg-secondary/10 flex items-center justify-center text-sm font-medium text-foreground">
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : <span>{initials}</span>}
    </div>
  );
}
