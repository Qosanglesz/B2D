// src/app/(investor)/coinbasepay/components/Button.tsx
interface ButtonProps {
    onClick: () => void;
    variant: 'primary' | 'secondary';
    children: React.ReactNode;
}

export const Button = ({ onClick, variant, children }: ButtonProps) => {
    const baseClasses = "inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary";
    const variantClasses = variant === 'primary' 
        ? "border-transparent text-white bg-primary hover:bg-primary-dark"
        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50";

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses}`}
        >
            {children}
        </button>
    );
};