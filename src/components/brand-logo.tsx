import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  withWordmark?: boolean;
};

export function BrandLogo({ className, withWordmark = true }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoMark className="h-8 w-8" />
      {withWordmark && (
        <span className="text-lg font-semibold tracking-tight text-foreground">Cypher</span>
      )}
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cypher-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--primary-glow)" />
        </linearGradient>
      </defs>
      <path
        d="M24 3c-6 0-11 1-14 3v14c0 11 6 19 14 22 8-3 14-11 14-22V6c-3-2-8-3-14-3z"
        fill="url(#cypher-grad)"
      />
      <path
        d="M24 15c-4.4 0-8 3.4-8 7.5 0 1.7.6 3.3 1.7 4.6l-1 3.4 3.6-1c1.1.6 2.4.9 3.7.9 4.4 0 8-3.4 8-7.5S28.4 15 24 15z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}
