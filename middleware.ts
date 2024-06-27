import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";

export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next()
    const session = req.cookies.get('session')?.value as string

    const loginUrl = new URL('/login', req.url)

    const protectedRoutes = ['/discover', '/messages/', '/profile']

    // it redirects to /login when this is added for some reason
    // if(!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    //     return NextResponse.redirect(loginUrl)
    // }
    
    const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

    const verify = await verifySession(session)

    if(!verify && isProtectedRoute){
        return NextResponse.redirect(loginUrl)
    }

    res.headers.set('userId', verify?.payload.sub as string)
    return res
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}