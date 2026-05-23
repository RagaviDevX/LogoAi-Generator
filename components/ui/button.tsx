import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "btn-glow",
        secondary:
          "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20",
        ghost: "text-white/50 hover:text-white hover:bg-white/5",
        destructive:
          "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20",
        outline:
          "border border-white/10 text-white/60 hover:text-white hover:border-white/25 hover:bg-white/5",
        glass: "glass text-white/70 hover:text-white hover:border-white/15",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
