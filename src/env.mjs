import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

// export const env = createEnv({
//   /**
//    * Specify your server-side environment variables schema here. This way you can ensure the app
//    * isn't built with invalid env vars.
//    */
//   server: {
//     DATABASE_URL: z.string(),
//     NODE_ENV: z.enum(["development", "test", "production"]),
//     CLERK_SECRET_KEY: z.string(),
//     RESEND_API_KEY: z.string(),
//     EMAIL_FROM_ADDRESS: z.string().email(),
//     UPLOADTHING_SECRET: z.string(),
//     UPLOADTHING_APP_ID: z.string(),
//     STRIPE_API_KEY: z.string(),
//     STRIPE_WEBHOOK_SECRET: z.string(),
//     STRIPE_STD_MONTHLY_PRICE_ID: z.string(),
//     STRIPE_PRO_MONTHLY_PRICE_ID: z.string(),
//   },

//   /**
//    * Specify your client-side environment variables schema here. This way you can ensure the app
//    * isn't built with invalid env vars. To expose them to the client, prefix them with
//    * `NEXT_PUBLIC_`.
//    */
//   client: {
//     NEXT_PUBLIC_APP_URL: z.string().url(),
//     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
//     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
//   },

//   /**
//    * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
//    * middlewares) or client-side so we need to destruct manually.
//    */
//   runtimeEnv: {
//     NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
//     DATABASE_URL: process.env.DATABASE_URL,
//     NODE_ENV: process.env.NODE_ENV,
//     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
//       process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
//     CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
//     RESEND_API_KEY: process.env.RESEND_API_KEY,
//     EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
//     UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
//     UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
//     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
//     STRIPE_API_KEY: process.env.STRIPE_API_KEY,
//     STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
//     STRIPE_STD_MONTHLY_PRICE_ID: process.env.STRIPE_STD_MONTHLY_PRICE_ID,
//     STRIPE_PRO_MONTHLY_PRICE_ID: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
//   },
//   /**
//    * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
//    * This is especially useful for Docker builds.
//    */
//   skipValidation: !!process.env.SKIP_ENV_VALIDATION,
// })

// Create env based on the following .env file
// # Kinde for secure, fast authentication - https://link.joshtriedcoding.com/kinde
// # production
// KINDE_CLIENT_ID=502328e222e14ccc8008aca08e818959
// KINDE_CLIENT_SECRET=ITYfXTcE0EFHReo9XHaErjdnKQTrvqOHSZ42rQgSbAySpvyd2K
// KINDE_ISSUER_URL=https://mealtime.kinde.com
// # development
// # KINDE_CLIENT_ID=e53a21133a1b4445841aedb87bfa5980
// # KINDE_CLIENT_SECRET=MQEQmD2cefSrfl4d0MUVXumiNfs6BtZHtekNbZVcdlbcetBoIm
// # KINDE_ISSUER_URL=https://mealtime-dev.eu.kinde.com
// # General local
// KINDE_SITE_URL=http://localhost:3000
// KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
// KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

// # Clerk Auth
// # pk_test, and sk_test are development keys
// # For production, use pk_live, and sk_live keys (a domain is required)
// NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cm9tYW50aWMta2l0dGVuLTAuY2xlcmsuYWNjb3VudHMuZGV2JA
// CLERK_SECRET_KEY=sk_test_Pl70YOs4AzTU6EMuzOEs6BCNZQ9ImHEkS1b9qlA7HH
// NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
// NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
// NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
// NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

// # Database for storing everything except PDF files - (Provider up to you, I like PlanetScale)
// # Production
// # DATABASE_URL='mysql://zc7frgf9ypkmbgwfllj4:pscale_pw_Ll5uap5U9ZWO3eHEIjKnLC3w0vK3TvwdS8BbTAMEUpq@aws.connect.psdb.cloud/mealtime?sslaccept=strict'
// # Development
// DATABASE_URL='mysql://zc7frgf9ypkmbgwfllj4:pscale_pw_Ll5uap5U9ZWO3eHEIjKnLC3w0vK3TvwdS8BbTAMEUpq@aws.connect.psdb.cloud/mealtime?sslaccept=strict'

// # Uploadthing for storing PDF files - https://uploadthing.com/dashboard
// UPLOADTHING_SECRET=sk_live_06cc234631d92c2ab56c8e2df9400a351891f9feb46d4d48f0e061ffbb9efd9e
// UPLOADTHING_APP_ID=mim0v2rj3v

// # OpenAI for answering PDF questions - https://platform.openai.com/
// OPENAI_API_KEY=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

// # Stripe for payment processing - https://stripe.com/
// STRIPE_SECRET_KEY="sk_test_51NaKShEEDeICbybduDpRjdUmJ5CuyGrvG0mRUZLHhtAEnCFG6ofiV8728imgQo25kNVj6RCwCdWoKAGftfMaxY6N00fIl1e4g4"
// STRIPE_WEBHOOK_SECRET="whsec_933582be7dc5b8bc385f7491630992211892379d2a0006d0d39de768119c6126"

// # Pinecone for long-term vector storage - https://www.pinecone.io/
// PINECONE_API_KEY="dce87c7b-ae35-4b6b-a3bb-98baab63582d"
export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		KINDE_CLIENT_ID: z.string(),
		KINDE_CLIENT_SECRET: z.string(),
		KINDE_ISSUER_URL: z.string().url(),
		KINDE_SITE_URL: z.string().url(),
		KINDE_POST_LOGOUT_REDIRECT_URL: z.string().url(),
		KINDE_POST_LOGIN_REDIRECT_URL: z.string().url(),
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
		CLERK_SECRET_KEY: z.string(),
		DATABASE_URL: z.string(),
		UPLOADTHING_SECRET: z.string(),
		UPLOADTHING_APP_ID: z.string(),
		OPENAI_API_KEY: z.string(),
		STRIPE_SECRET_KEY: z.string(),
		STRIPE_WEBHOOK_SECRET: z.string(),
		PINECONE_API_KEY: z.string(),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url(),
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
		KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
		KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
		KINDE_SITE_URL: process.env.KINDE_SITE_URL,
		KINDE_POST_LOGOUT_REDIRECT_URL:
			process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
		KINDE_POST_LOGIN_REDIRECT_URL:
			process.env.KINDE_POST_LOGIN_REDIRECT_URL,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
		UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
		UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		PINECONE_API_KEY: process.env.PINECONE_API_KEY,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
	 * This is especially useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
