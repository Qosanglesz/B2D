// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin} from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login : handleLogin (
        {
            authorizationParams : {
                audience : process.env.AUTH0_AUDIENCE,
                scope : 'openid profile email read:b2d-system'
            }
            ,returnTo: '/profile'
        }
    )
});