import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired(async (req) => {

    const res = NextResponse.next();

    const user = await getSession(req, res);

    if (!user) {
        return NextResponse.redirect("/api/auth/login");
    }
    // console.log(user.accessToken);
    console.log(user.accessToken)
    return res;
});

export const config = {
    matcher: ["/admin/:path*", "/campaign/:path*", '/profile/:path*'],
}; 