import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { LanguageProvider } from "@/lib/language-context"
import { TeosProvider } from "@/lib/teos-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Made with App Studio",
  description: "TEOS Egypt Civic Mixer - Decentralized analysis and transparency for TEOS Egypt ecosystem",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <LanguageProvider>
          <TeosProvider>{children}</TeosProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
