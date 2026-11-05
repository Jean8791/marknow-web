import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "MarkNow",
    description: "SaaS de agenda multi-tenant para prestadores de serviço (projeto de portfólio).",
};

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-pt">
        <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors closeButton />
        </body>
        </html>
    );
}