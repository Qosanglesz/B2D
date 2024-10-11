// app/admin/user/[id]/components/ErrorMessage.tsx
import { ErrorMessageProps } from '@/components/types/User';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="p-6 min-h-screen">
    <p className="text-red-500">{message}</p>
  </div>
);

export default ErrorMessage;