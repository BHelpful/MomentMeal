import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import { cn, constructMetadata } from "@/lib/utils"
import Providers from "@/components/Providers"

import "@/styles/globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import "simplebar-react/dist/simplebar.min.css"

import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = constructMetadata()

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="light">
			<body
				className={cn(
					"min-h-screen bg-background-50 font-sans  antialiased",
					inter.className
				)}
			>
				<Providers attribute="class" defaultTheme="system" enableSystem>
					<ClerkProvider>{children}</ClerkProvider>
				</Providers>
				<Toaster />
			</body>
		</html>
	)
}
