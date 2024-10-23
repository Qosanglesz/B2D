import {NextRequest, NextResponse} from "next/server";
import {withMiddlewareAuthRequired, getSession, Session} from "@auth0/nextjs-auth0/edge";
import {jwtDecode, JwtPayload} from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    permissions?: string[];
}

export default withMiddlewareAuthRequired(async (req: NextRequest) => {
    const res = NextResponse.next();

    const session: Session | null = (await getSession(req, res)) || null;

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.redirect("/api/auth/login");
    }

    const roles = session.user['https://localhost:3000/roles'] || [];
    const uid = session.user.sub

    // Check if the user has the 'Admin' role when trying to access the admin path
    if (req.nextUrl.pathname.startsWith('/admin') && !roles.includes('Admin B2D')) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    // Protect Common User try to access others account data
    const userIdFromPath = req.nextUrl.pathname.split('/')[3];
    const decodedUserIdFromPath = decodeURIComponent(userIdFromPath);
    if (
        req.nextUrl.pathname.startsWith('/api/user/') &&
        !req.nextUrl.pathname.endsWith('/patch') &&
        decodedUserIdFromPath !== uid &&
        !roles.includes('Admin B2D')
    ) {
        return NextResponse.redirect(new URL('/home', req.url)); // Redirect to an unauthorized page
    }

    // Protect Common User view Others' Statements
    const userIdStatement = req.nextUrl.pathname.split('/')[4];
    const decodedUidToGetStatement = decodeURIComponent(userIdStatement);
    if (
        req.nextUrl.pathname.startsWith('/api/statement/byuserid/') &&
        decodedUidToGetStatement !== uid &&
        !roles.includes('Admin B2D')
    ) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    // Protect Common User try to access all Statements
    if (req.nextUrl.pathname.startsWith('/api/statements') && !roles.includes('Admin B2D')) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    // Protect Common User try to access all Users' data
    if (req.nextUrl.pathname.startsWith('/api/users') && !roles.includes('Admin B2D')) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    if (session.accessToken) {
        const userPermissionData: CustomJwtPayload = jwtDecode(session.accessToken);
    }

    return res;
});

export const config = {
    matcher: [
        // Pages Section
        "/campaign/:path*",
        "/profile/:path*",
        "/portfolio/:path*",
        "/admin/:path*",
        //APIs Section
        "/api/users",
        "/api/user/:path*",
        "/api/statements",
        "/api/statement/:path*"

    ],
};
