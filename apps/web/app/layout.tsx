import {Geist, Geist_Mono} from "next/font/google"
import {ConvexClientProvider} from "@/components/providers"
import {ClerkProvider} from '@clerk/nextjs'
import "@workspace/ui/globals.css"
import React from "react";

const fontSans = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
})

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

const RootLayout = (
    {children}: Readonly<{ children: React.ReactNode }>
) => {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
        >
        <ClerkProvider>
            <ConvexClientProvider>
                {children}
            </ConvexClientProvider>
        </ClerkProvider>
        </body>
        </html>
    )
}

export default RootLayout;