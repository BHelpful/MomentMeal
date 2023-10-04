import { Shell } from '@/components/shells/shell';
import { getUserEmail } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Balancer from 'react-wrap-balancer';

const Page = async () => {
  const user = await currentUser();

  return (
    <Shell className="gap-8">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-2 md:pt-10 lg:py-28 lg:pb-2"
      >
        <div className="hover:bg-primary/50 mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-secondary-200 bg-primary-50 px-7 py-2 shadow-md backdrop-blur transition-all hover:border-secondary-300">
          <p className="text-sm font-semibold text-secondary-700">Dashboard</p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold text-secondary-500 md:text-6xl lg:text-7xl">
          Current user mail:
        </h1>
        <Balancer className="text-muted-foreground max-w-[46rem] text-lg sm:text-xl">
          {getUserEmail(user)}
        </Balancer>
        <Balancer className="text-muted-foreground max-w-[46rem] text-lg sm:text-xl">
          This site should only be accessible to logged in users.
        </Balancer>
      </section>
    </Shell>
  );
};

export default Page;
