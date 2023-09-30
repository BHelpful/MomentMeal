import { clsx, type ClassValue } from 'clsx';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
    if (typeof window !== 'undefined') return path;
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}${path}`;
    return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function constructMetadata({
    title = 'MealTime - the SaaS for students',
    description = 'MealTime is an open-source software to make chatting to your PDF files easy.',
    image = '/thumbnail.png',
    icons = '/logo.svg',
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@andreasgdp',
        },
        icons,
        metadataBase: new URL('https://mealtime.bhelpful.net/'),
        themeColor: '#FFF',
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
