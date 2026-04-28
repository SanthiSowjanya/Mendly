import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'glow';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
            'border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100': variant === 'outline',
            'hover:bg-slate-800 hover:text-slate-100 text-slate-300': variant === 'ghost',
            'bg-slate-800 text-slate-100 hover:bg-slate-700': variant === 'secondary',
            'bg-purple-600/20 text-purple-200 border border-purple-500/30 hover:bg-purple-600/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300': variant === 'glow',
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
