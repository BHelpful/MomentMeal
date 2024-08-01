import { Icons } from '@/components/icons';
import { Shell } from '@/components/shells/shell';
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallbackPage() {
  return (
    <Shell className="max-w-lg">
      <Icons.Spinner className="size-16 animate-spin" aria-hidden="true" />
      <AuthenticateWithRedirectCallback />
    </Shell>
  );
}
