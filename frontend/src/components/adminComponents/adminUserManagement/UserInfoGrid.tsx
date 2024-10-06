// app/admin/user/[id]/components/UserInfoGrid.tsx
import { UserInfoGridProps } from '@/components/types/user';

const UserInfoGrid: React.FC<UserInfoGridProps> = ({ user }) => (
  <div className="grid grid-cols-2 gap-4">
    <p><strong>User ID:</strong> {user.user_id}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</p>
    <p><strong>Family Name:</strong> {user.family_name}</p>
    <p><strong>Given Name:</strong> {user.given_name}</p>
    <p><strong>Nickname:</strong> {user.nickname}</p>
    <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
    <p><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</p>
    <p><strong>Last Login:</strong> {new Date(user.last_login).toLocaleString()}</p>
    <p><strong>Last IP:</strong> {user.last_ip}</p>
    <p><strong>Logins Count:</strong> {user.logins_count}</p>
  </div>
);

export default UserInfoGrid;