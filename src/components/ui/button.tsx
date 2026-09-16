import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-display text-sm font-semibold tracking-tight transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-brand hover:bg-primary-strong hover:-translate-y-0.5",
        secondary: "border border-border bg-background text-foreground hover:border-primary hover:text-primary",
        outline: "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        dark: "bg-foreground text-background hover:bg-primary hover:text-primary-foreground",
        light: "bg-background text-foreground hover:-translate-y-0.5",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        default: "h-11",
        sm: "h-9 min-h-9 px-4 text-xs",
        lg: "h-12 px-6",
        icon: "size-11 min-h-11 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
});

export { Button, buttonVariants };