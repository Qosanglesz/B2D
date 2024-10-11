// app/admin/user/[id]/components/BackButton.tsx
import { BackButtonProps } from '@/components/types/User';

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <button 
    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    onClick={onClick}
  >
    Back to User Management
  </button>
);

export default BackButton;