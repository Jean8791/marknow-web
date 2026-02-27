import {NextRequest, NextResponse} from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("marknow_token")?.value;
    const role = request.cookies.get("marknow_role")?.value;
    const prestadorOid = request.cookies.get("marknow_prestador_oid")?.value;
    const userOid = request.cookies.get("marknow_user_oid")?.value;

    const {pathname} = request.nextUrl;

    console.log("Proxy Request:", {pathname, token, role, prestadorOid, userOid});

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname.startsWith('/favicon.ico')
    ) {
        return NextResponse.next();
    }

    if (pathname.startsWith('/auth')) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (pathname === "/prestador" && role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/prestador/") && role === "ADMIN") {
        const targetOid = pathname.split("/")[2];
        if (targetOid && targetOid !== prestadorOid) {
            return NextResponse.redirect(new URL(`/prestador/${prestadorOid}`, request.url));
        }
    }

    if (pathname.startsWith("/usuario/") && role === "OPERACIONAL") {
        const targetOid = pathname.split("/")[2];
        if (targetOid && targetOid !== userOid) {
            return NextResponse.redirect(new URL(`/usuario/${userOid}`, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};