import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-40 active:scale-95 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-[0_2px_0_0_#059669,0_1px_3px_rgba(0,0,0,0.15)] hover:from-emerald-400 hover:to-emerald-500 active:shadow-none active:translate-y-0.5",
        destructive:
          "bg-gradient-to-b from-red-500 to-red-600 text-white shadow-[0_2px_0_0_#dc2626,0_1px_3px_rgba(0,0,0,0.15)] hover:from-red-400 hover:to-red-500 active:shadow-none active:translate-y-0.5",
        outline:
          "border-2 border-gray-200 bg-white text-gray-700 shadow-sm hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100",
        secondary:
          "bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 shadow-[0_2px_0_0_#d1d5db] hover:from-gray-50 hover:to-gray-100 active:shadow-none active:translate-y-0.5",
        ghost:
          "text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
        link:
          "text-emerald-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-7 px-3 text-xs rounded-lg",
        lg: "h-11 px-6 text-base",
        icon: "h-9 w-9",
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
