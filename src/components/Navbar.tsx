import Link from "next/link"
import { currentUser } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"

import MaxWidthWrapper from "./MaxWidthWrapper"
import MobileNav from "./MobileNav"
import { ThemeToggle } from "./theme-toggle"
import { buttonVariants } from "./ui/button"
import UserAccountNav from "./UserAccountNav"

const Navbar = async () => {
	const user = await currentUser()

	return (
		<nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-secondary-200 bg-background-50/75 backdrop-blur-lg transition-all">
			<MaxWidthWrapper>
				<div className="flex h-14 items-center justify-between border-b border-secondary-200">
					<Link href="/" className="z-40 flex font-semibold">
						<span>MealTime</span>
					</Link>

					<ThemeToggle />

					<MobileNav isAuth={!!user} />

					<div className="hidden items-center space-x-4 sm:flex">
						{!user ? (
							<>
								<Link
									href="/pricing"
									className={buttonVariants({
										variant: "ghost",
										size: "sm",
									})}
								>
									Pricing
								</Link>
								<Link
									href="/signin"
									className={buttonVariants({
										variant: "ghost",
										size: "sm",
									})}
								>
									Sign in
								</Link>
								<Link
									href="/signup"
									className={buttonVariants({
										size: "sm",
									})}
								>
									Get started{" "}
									<ArrowRight className="ml-1.5 h-5 w-5" />
								</Link>
							</>
						) : (
							<>
								<Link
									href="/dashboard"
									className={buttonVariants({
										variant: "ghost",
										size: "sm",
									})}
								>
									Dashboard
								</Link>

								<UserAccountNav
									name={
										!user.firstName || !user.lastName
											? "Your Account"
											: `${user.firstName} ${user.lastName}`
									}
									email={user.primaryEmailAddressId ?? ""}
									imageUrl={user.imageUrl ?? ""}
								/>
							</>
						)}
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	)
}

export default Navbar
