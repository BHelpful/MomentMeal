'use client';

import { trpc } from '@/app/_trpc/client';
import { getUserSubscriptionPlan } from '@/lib/stripe';
import { format } from 'date-fns';
import { Ghost, Loader2, MessageSquare, Plus, Trash } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useState } from 'react';
import SkeletonTheme from 'react-loading-skeleton';
import UploadButton from './UploadButton';
import { Button } from './ui/button';

interface PageProps {
    subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const Dashboard = ({ subscriptionPlan }: PageProps) => {
    const { theme } = useTheme();

    console.log(theme);

    const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
        string | null
    >(null);

    const utils = trpc.useContext();

    const { data: files, isLoading } = trpc.getUserFiles.useQuery();

    const { mutate: deleteFile } = trpc.deleteFile.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate();
        },
        onMutate({ id }) {
            setCurrentlyDeletingFile(id);
        },
        onSettled() {
            setCurrentlyDeletingFile(null);
        },
    });

    return (
        <main className="mx-auto max-w-7xl md:p-10">
            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-primary-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-secondary-900">
                    My Files
                </h1>

                <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
            </div>

            {/* display all user files */}
            {files && files?.length !== 0 ? (
                <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-secondary-200 md:grid-cols-2 lg:grid-cols-3">
                    {files
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .map((file) => (
                            <li
                                key={file.id}
                                className="col-span-1 divide-y divide-secondary-200 rounded-lg bg-primary-50 shadow transition hover:shadow-lg"
                            >
                                <Link
                                    href={`/dashboard/${file.id}`}
                                    className="flex flex-col gap-2"
                                >
                                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-primary-500" />
                                        <div className="flex-1 truncate">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="truncate text-lg font-medium text-secondary-900">
                                                    {file.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-secondary-500">
                                    <div className="flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        {format(
                                            new Date(file.createdAt),
                                            'MMM yyyy'
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        mocked
                                    </div>

                                    <Button
                                        onClick={() =>
                                            deleteFile({ id: file.id })
                                        }
                                        size="sm"
                                        className="w-full"
                                        variant="destructive"
                                    >
                                        {currentlyDeletingFile === file.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </li>
                        ))}
                </ul>
            ) : isLoading ? (
                // TODO make own skeleton like https://github.com/sadmann7/skateshop/blob/c1e2775c43de7f2106e691a6e583faafade20201/src/components/ui/skeleton.tsx#L4 to get around initial hydration problem
                theme === 'dark' ? (
                    <SkeletonTheme
                        height={100}
                        baseColor="#333"
                        highlightColor="#666"
                        className="my-2 rounded-lg shadow transition hover:shadow-lg"
                        count={3}
                    />
                ) : (
                    <SkeletonTheme
                        height={100}
                        className="my-2 rounded-lg shadow transition hover:shadow-lg"
                        count={3}
                    />
                )
            ) : (
                <div className="mt-16 flex flex-col items-center gap-2">
                    <Ghost className="h-8 w-8 text-secondary-800" />
                    <h3 className="font-semibold text-xl">
                        Pretty empty around here
                    </h3>
                    <p>Let&apos;s upload your first PDF.</p>
                </div>
            )}
        </main>
    );
};

export default Dashboard;
