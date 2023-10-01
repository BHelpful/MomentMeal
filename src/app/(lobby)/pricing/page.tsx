import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react"

import { PLANS } from "@/config/stripe"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const Page = async () => {
	const user = await currentUser()

	const pricingItems = [
		{
			plan: "Free",
			tagline: "For those just getting started with MealTime.",
			quota: PLANS.find((p) => p.slug === "free")!.quota,
			features: [
				{
					text: "Create and share recipes",
					footnote: "Begin your culinary journey today.",
				},
				{
					text: "Mobile-friendly interface",
				},
				{
					text: "Higher-quality responses",
					footnote:
						"Better algorithmic responses for enhanced content quality",
					negative: true,
				},
				{
					text: "Priority support",
					negative: true,
				},
			],
		},
		{
			plan: "Pro",
			tagline: "For those who want more out of MealTime.",
			quota: PLANS.find((p) => p.slug === "pro")!.quota,
			features: [
				{
					text: "Create and share recipes",
					footnote: "Begin your culinary journey today.",
				},
				{
					text: "Mobile-friendly interface",
				},
				{
					text: "Higher-quality responses",
					footnote:
						"Better algorithmic responses for enhanced content quality",
				},
				{
					text: "Priority support",
				},
			],
		},
		{
			plan: "Business",
			tagline: "For those who want the best of MealTime.",
			quota: PLANS.find((p) => p.slug === "business")!.quota,
			features: [
				{
					text: "Create and share recipes",
					footnote: "Begin your culinary journey today.",
				},
				{
					text: "Mobile-friendly interface",
				},
				{
					text: "Higher-quality responses",
					footnote:
						"Better algorithmic responses for enhanced content quality",
				},
				{
					text: "Priority support",
				},
			],
		},
	]

	return (
		<>
			<MaxWidthWrapper className="mb-8 mt-24 max-w-5xl text-center">
				<div className="mx-auto mb-10 sm:max-w-lg">
					<h1 className="text-6xl font-bold sm:text-7xl">Pricing</h1>
					<p className="mt-5 text-secondary-600 sm:text-lg">
						Whether you&apos;re just trying out our service or need
						more, we&apos;ve got you covered.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-10 pt-12 lg:grid-cols-3">
					<TooltipProvider>
						{pricingItems.map(
							({ plan, tagline, quota, features }) => {
								const price =
									PLANS.find(
										(p) => p.slug === plan.toLowerCase()
									)?.price.amount || 0

								// if quota is null, then it's unlimited else quota.toLocaleString()
								const quataThing =
									quota === null
										? "Unlimited"
										: quota.toLocaleString()

								return (
									<div
										key={plan}
										className={cn(
											"relative rounded-2xl bg-primary-50 shadow-lg",
											{
												"border-2 border-primary-600 shadow-primary-200":
													plan === "Pro",
												"border border-secondary-200":
													plan !== "Pro",
											}
										)}
									>
										{plan === "Pro" && (
											<div className="text-primary absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-primary-600 to-cyan-600 px-3 py-2 text-sm font-medium">
												Upgrade now
											</div>
										)}

										<div className="p-5">
											<h3 className="font-display my-3 text-center text-3xl font-bold">
												{plan}
											</h3>
											<p className="text-secondary-500">
												{tagline}
											</p>
											<p className="font-display my-5 text-6xl font-semibold">
												${price}
											</p>
											<p className="text-secondary-500">
												per month
											</p>
										</div>

										<div className="flex h-20 items-center justify-center border-b border-t border-secondary-200 bg-secondary-50">
											<div className="flex items-center space-x-1">
												<p>
													{quataThing} recipes saved
												</p>

												<Tooltip delayDuration={300}>
													<TooltipTrigger className="ml-1.5 cursor-default">
														<HelpCircle className="h-4 w-4 text-secondary-500" />
													</TooltipTrigger>
													<TooltipContent className="w-80 bg-primary-50 p-2">
														Your quota is the number
														of recipes you can save
														to MealTime. You can
														upgrade to Pro at any
														time to get more quota.
													</TooltipContent>
												</Tooltip>
											</div>
										</div>

										<ul className="my-10 space-y-5 px-8">
											{features.map(
												({
													text,
													footnote,
													negative,
												}) => (
													<li
														key={text}
														className="flex space-x-5"
													>
														<div className="flex-shrink-0">
															{negative ? (
																<Minus className="h-6 w-6 text-secondary-300" />
															) : (
																<Check className="h-6 w-6 text-primary-500" />
															)}
														</div>
														{footnote ? (
															<div className="flex items-center space-x-1">
																<p
																	className={cn(
																		"text-secondary-600",
																		{
																			"text-secondary-400":
																				negative,
																		}
																	)}
																>
																	{text}
																</p>
																<Tooltip
																	delayDuration={
																		300
																	}
																>
																	<TooltipTrigger className="ml-1.5 cursor-default">
																		<HelpCircle className="h-4 w-4 text-secondary-500" />
																	</TooltipTrigger>
																	<TooltipContent className="w-80 bg-primary-50 p-2">
																		{
																			footnote
																		}
																	</TooltipContent>
																</Tooltip>
															</div>
														) : (
															<p
																className={cn(
																	"text-secondary-600",
																	{
																		"text-secondary-400":
																			negative,
																	}
																)}
															>
																{text}
															</p>
														)}
													</li>
												)
											)}
										</ul>
										<div className="border-t border-secondary-200" />
										<div className="p-5">
											{plan === "Free" ? (
												<Link
													href={
														user
															? "/dashboard"
															: "/signup"
													}
													className={buttonVariants({
														className: "w-full",
														variant: "secondary",
													})}
												>
													{user
														? "Dashboard"
														: "Sign up"}
													<ArrowRight className="ml-1.5 h-5 w-5" />
												</Link>
											) : user ? (
												<Button
													disabled
													className={buttonVariants({
														className: "w-full",
													})}
												>
													Comming Soon
												</Button>
											) : (
												<Button
													disabled
													className={buttonVariants({
														className: "w-full",
													})}
												>
													Comming Soon
												</Button>
											)}
										</div>
									</div>
								)
							}
						)}
					</TooltipProvider>
				</div>
			</MaxWidthWrapper>
		</>
	)
}

export default Page
