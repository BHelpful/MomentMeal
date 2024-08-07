import { Icons } from '@/components/icons';
import { Shell } from '@/components/shells/shell';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

export default function Home() {
  return (
    <>
      <Shell className="gap-8">
        <section
          id="hero"
          aria-labelledby="hero-heading"
          className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-2 md:pt-10 lg:py-28 lg:pb-2"
        >
          <Icons.logo className="size-32" aria-hidden="true" />
          <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border px-7 py-2 shadow-md backdrop-blur transition-all hover:bg-primary/50">
            <p className="text-sm font-semibold">
              MomentMeal is in Alpha development!
            </p>
          </div>
          <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
            <span className="text-primary">Elevate</span> your cooking
          </h1>
          <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
            MomentMeal is a marketplace for food and recipes. We help you find
            and create the best recipes and meal plans for you.
          </Balancer>
          <div className="flex gap-4">
            <Link
              href="/dashboard/recipes"
              className={buttonVariants({
                size: 'lg',
                className: '',
              })}
            >
              Get started
            </Link>
            <Link
              href="/recipes"
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
              })}
            >
              Explore <Icons.Recipe className="ml-1.5 size-5" />
            </Link>
          </div>
        </section>
      </Shell>

      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/images/bundle.webp"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={1}
                    priority
                    className="rounded-md shadow-2xl ring-1 ring-foreground/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto my-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 text-4xl font-bold sm:text-5xl">
              Start sharing your recipes in minutes
            </h2>
            <p className="mt-4 text-lg">
              With MomentMeal you can add your recipes and share them with the
              world. You can also discover new recipes and meal plans from other
              users.
            </p>
          </div>
        </div>

        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2">
                You can sign up for an account and have a look around.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium">Step 2</span>
              <span className="text-xl font-semibold">Add your recipes</span>
              <span className="mt-2">
                You can add all your favourite recipes to your account, letting
                you have them all in one place.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium">Step 3</span>
              <span className="text-xl font-semibold">Share your recipes</span>
              <span className="mt-2">
                You can share your recipes with the world and let others enjoy.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium">Step 4</span>
              <span className="text-xl font-semibold">
                Fork other recipes (Coming soon)
              </span>
              <span className="mt-2">
                See a recipe you like, but you always add a little extra garlic?
                Fork it and make it your own version.
              </span>
            </div>
          </li>
        </ol>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/images/dinner.webp"
                alt="uploading preview"
                width={1419}
                height={732}
                quality={1}
                loading="lazy"
                className="rounded-md shadow-2xl ring-1 ring-foreground/10"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
