import { redirect } from "next/navigation"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"

import { getUserSubscriptionPlan } from "@/lib/stripe"
import Dashboard from "@/components/Dashboard"

const Page = async () => {
	const user = await currentUser()

	if (!user || !user.id) redirect("/auth-callback?origin=dashboard")

	const dbUser = await db.user.findFirst({
		where: {
			id: user.id,
		},
	})

	if (!dbUser) redirect("/auth-callback?origin=dashboard")

	const subscriptionPlan = await getUserSubscriptionPlan()

	return <Dashboard subscriptionPlan={subscriptionPlan} />
}

export default Page
