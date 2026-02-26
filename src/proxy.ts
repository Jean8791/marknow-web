// src/proxy.ts
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export function proxy(request: NextRequest) {
    const role = request.cookies.get("marknow_role")?.value;

    if (request.nextUrl.pathname.startsWith("/prestador") && role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/prestador/:path*", "/plano/:path*"],
};