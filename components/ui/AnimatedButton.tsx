import Link from "next/link";
import { ArrowRight, ChevronRight, MoveRight, Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "default" | "lg";

const DEFAULT_ICON: Record<Variant, LucideIcon> = {
  primary: ArrowRight,
  secondary: ChevronRight,
  ghost: MoveRight,
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  default: "px-6 py-2.5 text-[13px]",
  lg: "px-8 py-3.5 text-base",
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "relative overflow-hidden rounded-sm bg-accent font-semibold text-[#1a1a1a] hover:scale-105 hover:bg-primary hover:text-white before:absolute before:inset-0 before:-translate-x-full before:bg-white/20 before:transition-transform before:duration-500 before:content-[''] hover:before:translate-x-full",
  secondary:
    "relative rounded-sm border-2 border-current font-semibold hover:border-primary hover:text-primary",
  ghost:
    "relative font-accent text-sm uppercase tracking-wide text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:content-[''] hover:text-accent hover:after:scale-x-100",
};

const ICON_CLASSES: Record<Variant, string> = {
  primary: "transition-transform duration-200 group-hover:translate-x-1",
  secondary: "transition-transform duration-200 group-hover:rotate-45",
  ghost: "transition-transform duration-200 group-hover:translate-x-1",
};

type AnimatedButtonProps = {
  variant?: Variant;
  icon?: LucideIcon;
  size?: Size;
  loading?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export default function AnimatedButton({
  variant = "primary",
  icon,
  size = "default",
  loading = false,
  href,
  className,
  children,
  type = "button",
  disabled,
  onClick,
}: AnimatedButtonProps) {
  const Icon = loading ? Loader2 : icon ?? DEFAULT_ICON[variant];
  const iconClassName = loading ? "animate-spin" : ICON_CLASSES[variant];

  const classes = cn(
    "group inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:pointer-events-none disabled:opacity-70",
    variant !== "ghost" && SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <Icon size={16} className={cn("relative z-10", iconClassName)} />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled || loading} onClick={onClick}>
      {content}
    </button>
  );
}
