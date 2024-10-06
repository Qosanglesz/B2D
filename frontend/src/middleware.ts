import { NextRequest, NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession, Session } from "@auth0/nextjs-auth0/edge";
import { jwtDecode, JwtPayload } from "jwt-decode";

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

  // Check if the user has the 'Admin' role when trying to access the admin path
  const roles = session.user['https://localhost:3000/roles'] || [];
  if (req.nextUrl.pathname.startsWith('/admin') && !roles.includes('Admin B2D')) {
    return NextResponse.redirect(new URL('/home', req.url)); // Redirect to an unauthorized page
  }

  if (session.accessToken) {
    const userPermissionData: CustomJwtPayload = jwtDecode(session.accessToken);
  }

  return res;
});

export const config = {
  matcher: ["/admin/:path*", "/campaign/:path*", '/profile/:path*'],
};