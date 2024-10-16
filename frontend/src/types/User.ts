export interface User {
    user_id: string;
    name: string;
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    nickname: string;
    picture: string;
    created_at: string;
    updated_at: string;
    last_login: string;
    last_ip: string;
    logins_count: number;
}

export interface UserAvatarProps {
    name: string;
    picture: string;
}

export interface UserInfoGridProps {
    user: User;
}

export interface BackButtonProps {
    onClick: () => void;
}

export interface ErrorMessageProps {
    message: string;
}
