export function Button({ children, className = '', variant = 'primary', size = 'md', ...props }) {
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
    return (<button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </button>);
}
