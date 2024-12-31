import { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  href,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-full font-medium transition-colors flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]',
    secondary: 'bg-black/[.05] dark:bg-white/[.06] hover:bg-black/[.1] dark:hover:bg-white/[.1]',
    outline: 'border border-solid border-black/[.1] dark:border-white/[.1] hover:bg-black/[.05] dark:hover:bg-white/[.05]'
  };

  const sizeStyles = {
    sm: 'text-sm h-8 px-3',
    md: 'text-base h-10 px-4',
    lg: 'text-lg h-12 px-6'
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles}
      {...props}
    >
      {children}
    </button>
  );
}
