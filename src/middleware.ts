// middleware.ts
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

// middleware.ts
export function middleware(request: NextRequest) {

    const role = request.cookies.get('marknow_role')?.value;

    console.log('Role extraída:', role);

    if (request.nextUrl.pathname.startsWith('/prestador')) {
        if (role !== 'SUPER_ADMIN') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/prestador/:path*', '/plano/:path*'],
};