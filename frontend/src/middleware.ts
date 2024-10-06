import { NextRequest, NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession, Session } from "@auth0/nextjs-auth0/edge";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  // Add any custom fields you expect in your JWT payload
  permissions?: string[];
  // Add other custom fields as needed
}

export default withMiddlewareAuthRequired(async (req: NextRequest) => {
  const res = NextResponse.next();

  const user: Session | null = (await getSession(req, res)) || null;

  if (!user) {
    return NextResponse.redirect("/api/auth/login");
  }

  if (user.accessToken) {
    const userPermissionData: CustomJwtPayload = jwtDecode(user.accessToken);
    console.log('userPermissionData', userPermissionData.permissions);
  }
  console.log('user [accessTokenScope]',user.accessTokenScope)
  return res;
});

export const config = {
  matcher: ["/admin/:path*", "/campaign/:path*", '/profile/:path*'],
};