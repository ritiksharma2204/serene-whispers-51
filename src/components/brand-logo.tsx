import { cn } from "@/lib/utils";
import logoAsset from "@/assets/signal-logo.png";

type Props = {
  className?: string;
  withWordmark?: boolean;
};

export function BrandLogo({ className, withWordmark = true }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoMark className="h-8 w-8" />
      {withWordmark && (
        <span className="text-lg font-semibold tracking-tight text-foreground">Signal</span>
      )}
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Signal logo"
      className={cn("rounded-[22%] object-cover", className)}
      draggable={false}
    />
  );
}
