import { Inter } from "next/font/google"

import { constructMetadata } from "@/lib/utils"
import Navbar from "@/components/Navbar"

import "react-loading-skeleton/dist/skeleton.css"
import "simplebar-react/dist/simplebar.min.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = constructMetadata()

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="relative flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-1">{children}</main>
		</div>
	)
}
