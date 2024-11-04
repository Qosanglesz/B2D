// src/app/(investor)/coinbasepay/components/LoadingIndicator.tsx
interface LoadingIndicatorProps {
    color: string;
}

export const LoadingIndicator = ({ color }: LoadingIndicatorProps) => (
    <div className="animate-pulse flex justify-center">
        <div className={`h-2 w-24 ${color} rounded`}></div>
    </div>
);