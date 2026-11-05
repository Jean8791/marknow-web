import {NextRequest, NextResponse} from "next/server";

const ROTAS_SUPER_ADMIN = ['/plano', '/assinatura', '/convite'];
const ROTAS_PRESTADOR = ['/agendamento'];

const comecaCom = (pathname: string, rotas: string[]) =>
    rotas.some(rota => pathname === rota || pathname.startsWith(`${rota}/`));

export function proxy(request: NextRequest) {
    const token = request.cookies.get("marknow_token")?.value;
    const role = request.cookies.get("marknow_role")?.value;
    const prestadorOid = request.cookies.get("marknow_prestador_oid")?.value;

    const {pathname} = request.nextUrl;

    if (pathname.startsWith('/auth')) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const paraDashboard = () => NextResponse.redirect(new URL("/dashboard", request.url));

    if (comecaCom(pathname, ROTAS_SUPER_ADMIN) && role !== "SUPER_ADMIN") {
        return paraDashboard();
    }

    if (pathname === "/prestador" && role !== "SUPER_ADMIN") {
        return paraDashboard();
    }

    if (pathname.startsWith("/prestador/")) {
        if (role !== "ADMIN") return paraDashboard();
        const targetOid = pathname.split("/")[2];
        if (targetOid && targetOid !== prestadorOid) {
            return NextResponse.redirect(new URL(`/prestador/${prestadorOid}`, request.url));
        }
    }

    if (comecaCom(pathname, ['/usuario']) && role !== "ADMIN") {
        return paraDashboard();
    }

    if (comecaCom(pathname, ROTAS_PRESTADOR) && role === "SUPER_ADMIN") {
        return paraDashboard();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
