import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

const Page = async () => {
	const user = await currentUser()

	if (!user || !user.id) redirect("/auth-callback?origin=dashboard")

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Current user: {user.id}</p>
			<p>This site should only be accessible to logged in users.</p>
		</div>
	)
}

export default Page
