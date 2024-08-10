import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')?.value;

    if(!currentUser && (request.nextUrl.pathname.startsWith('/user')
        || request.nextUrl.pathname.startsWith('/recipe/create'))) {
        return Response.redirect(new URL('/login', request.url));
    }

    if (currentUser && request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/user', request.url));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}