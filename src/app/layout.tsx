import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const uncage = localFont({
  src: "./fonts/UNCAGE-Medium.ttf",
  variable: "--font-uncage",
})

const nebulas = localFont({
  src: [
    {
      path: "./fonts/Nebulas-Medium.otf",
      weight: "500",
    },
    {
      path: "./fonts/Nebulas-Regular.otf",
      weight: "400",
    },
    {
      path: "./fonts/Nebulas-SemiBold.otf",
      weight: "600",
    },
    {
      path: "./fonts/Nebulas-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-nebulas",
})

export const metadata: Metadata = {
  title: "ISTOK Demo",
  description: "",
  icons: "./favicon.svg",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <head>
        <link
          rel='icon'
          href='/icon.svg'
        />
      </head>
      <body className={`${nebulas.variable} ${uncage.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
