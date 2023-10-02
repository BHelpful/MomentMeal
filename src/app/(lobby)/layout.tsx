import { Inter } from "next/font/google"
import { currentUser } from "@clerk/nextjs"

import { constructMetadata } from "@/lib/utils"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

import "react-loading-skeleton/dist/skeleton.css"
import "simplebar-react/dist/simplebar.min.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = constructMetadata()

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await currentUser()

	return (
		<div className="relative flex min-h-screen flex-col">
			{/* <Navbar /> */}
			<SiteHeader user={user} />
			<main className="flex-1">{children}</main>
			<SiteFooter />
		</div>
	)
}
