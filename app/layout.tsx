import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { NextUIProvider } from "@nextui-org/system";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "shelfmates",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <NextUIProvider>
                    <CookiesProvider>
                        {children}
                    </CookiesProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
