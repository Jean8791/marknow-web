import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "MarkNow - Gestão de Convites",
    description: "O teu SaaS de gestão de eventos e convites",
};

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-pt">
        <body className={inter.className}>
        {/* Este children é onde as tuas páginas (login, home, etc) vão aparecer */}
        {children}
        </body>
        </html>
    );
}