// app/admin/user/[id]/components/UserAvatar.tsx
import Image from 'next/image';
import { UserAvatarProps } from '@/components/types/User';

const UserAvatar: React.FC<UserAvatarProps> = ({ name, picture }) => (
  <div className="flex items-center mb-4">
    <Image 
      src={picture} 
      alt={name} 
      width={96} 
      height={96} 
      className="rounded-full mr-4"
    />
    <h3 className="text-2xl font-bold">{name}</h3>
  </div>
);

export default UserAvatar;