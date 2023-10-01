import Image from "next/image"
import Link from "next/link"
import { SignOutButton } from "@clerk/nextjs"
import { Gem } from "lucide-react"

import { getUserSubscriptionPlan } from "@/lib/stripe"

import { Icons } from "./icons"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface UserAccountNavProps {
	email: string | undefined
	name: string
	imageUrl: string
}

const UserAccountNav = async ({
	email,
	imageUrl,
	name,
}: UserAccountNavProps) => {
	const subscriptionPlan = await getUserSubscriptionPlan()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="overflow-visible">
				<Button className="aspect-square h-8 w-8 rounded-full bg-slate-400">
					<Avatar className="relative h-8 w-8">
						{imageUrl ? (
							<div className="relative aspect-square h-full w-full">
								<Image
									fill
									src={imageUrl}
									alt="profile picture"
									referrerPolicy="no-referrer"
								/>
							</div>
						) : (
							<AvatarFallback>
								<span className="sr-only">{name}</span>
								<Icons.user className="h-4 w-4 text-secondary-900" />
							</AvatarFallback>
						)}
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="bg-primary-50" align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-0.5 leading-none">
						{name && (
							<p className="text-primary text-sm font-medium">
								{name}
							</p>
						)}
						{email && (
							<p className="w-[200px] truncate text-xs text-secondary-700">
								{email}
							</p>
						)}
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href="/dashboard">Dashboard</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild>
					{subscriptionPlan?.isSubscribed ? (
						<Link href="/dashboard/billing">
							Manage Subscription
						</Link>
					) : (
						<Link href="/pricing">
							Upgrade{" "}
							<Gem className="ml-1.5 h-4 w-4 text-primary-600" />
						</Link>
					)}
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem className="cursor-pointer">
					<SignOutButton>Log out</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserAccountNav
