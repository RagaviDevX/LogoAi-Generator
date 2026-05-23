import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-violet-500/15 text-violet-300 border border-violet-500/20",
        secondary: "bg-white/5 text-white/60 border border-white/10",
        success: "bg-green-500/15 text-green-300 border border-green-500/20",
        warning: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
        destructive: "bg-red-500/15 text-red-300 border border-red-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
