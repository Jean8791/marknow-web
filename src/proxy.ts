import {NextRequest, NextResponse} from "next/server";

export function proxy(request: NextRequest) {
    const role = request.cookies.get("marknow_role")?.value;
    const userOid = request.cookies.get("marknow_user_oid")?.value;
    const prestadorOid = request.cookies.get("marknow_prestador_oid")?.value;
    const {pathname} = request.nextUrl;

    // 1. Proteção da Lista de Prestadores (Apenas SUPER_ADMIN)
    if (pathname === "/prestador" && role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 2. Proteção da Edição de Prestador (ADMIN só vê o DELE)
    if (pathname.startsWith("/prestador/") && role === "ADMIN") {
        const targetOid = pathname.split("/")[2];
        if (targetOid !== prestadorOid) {
            return NextResponse.redirect(new URL(`/prestador/${prestadorOid}`, request.url));
        }
    }

    // 3. Proteção da Edição de Usuário (OPERACIONAL só vê o DELE)
    if (pathname.startsWith("/usuario/") && role === "OPERACIONAL") {
        const targetOid = pathname.split("/")[2];
        if (targetOid !== userOid) {
            return NextResponse.redirect(new URL(`/usuario/${userOid}`, request.url));
        }
    }

    return NextResponse.next();
}