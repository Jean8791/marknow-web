import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

const jakarta = Plus_Jakarta_Sans({subsets: ["latin"], variable: "--font-jakarta"});

export const metadata: Metadata = {
    title: "MarkNow",
    description: "SaaS de agenda multi-tenant para prestadores de serviço (projeto de portfólio).",
};

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-pt">
        <body className={`${jakarta.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-right" richColors closeButton />
        </body>
        </html>
    );
}