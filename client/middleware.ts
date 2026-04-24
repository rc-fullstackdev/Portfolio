// import { NextRequest, NextResponse } from 'next/server'

// export const proxy = (req: NextRequest) => {

//     const token = req.cookies.get("ADMIN")

//     if (!token) {
//         return NextResponse.redirect(new URL("/login", req.url))
//     }
//     return NextResponse.next()
// }

// export const config = {
//     matcher: ["/admin/:path*"] // any route matches /admin/anything
// }


import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    const { pathname, searchParams } = req.nextUrl
    const token = req.cookies.get("ADMIN")

    if (pathname.startsWith('/admin') && !token) {
        return NextResponse.redirect(new URL('/404', req.url))
    }

    if (pathname === '/login') {
        const secret = searchParams.get('secret')

        if (secret !== 'true') {
            return NextResponse.redirect(new URL('/404', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/login"]
}