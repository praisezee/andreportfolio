import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "André's Creation - UI/UX & Graphic Designer",
  description:
    "Portfolio of André Pascal, a passionate UI/UX designer with over 10 years of experience in graphic design. Specializing in Figma, Canva, and user-centered digital experiences.",
  keywords: ["UI/UX Designer", "Graphic Designer", "Figma", "Canva", "Visual Design", "User Experience"],
  authors: [{ name: "André Pascal" }],
  creator: "André Pascal",
  openGraph: {
    title: "André's Creation - UI/UX & Graphic Designer",
    description:
      "Portfolio of André Pascal, a passionate UI/UX designer with over 10 years of experience in graphic design.",
    url: "https://andrescreation.com",
    siteName: "André's Creation",
    images: [
      {
        url: "/logo-light.png",
        width: 1200,
        height: 630,
        alt: "André's Creation Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "André's Creation - UI/UX & Graphic Designer",
    description:
      "Portfolio of André Pascal, a passionate UI/UX designer with over 10 years of experience in graphic design.",
    images: ["/logo-light.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
