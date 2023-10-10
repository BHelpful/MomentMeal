export const PLANS = [
  {
    name: 'Free',
    slug: 'free',
    quota: 15,
    pagesPerPdf: 5,
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Pro',
    slug: 'pro',
    quota: 50,
    pagesPerPdf: 25,
    price: {
      amount: 5,
      priceIds: {
        test: 'price_1NuEwTA19umTXGu8MeS3hN8L',
        production: '',
      },
    },
  },
  {
    name: 'Business',
    slug: 'business',
    quota: 0, // Unlimited
    pagesPerPdf: 50,
    price: {
      amount: 29,
      priceIds: {
        test: 'price_1NuEwTA19umTXGu8MeS3hN8L',
        production: '',
      },
    },
  },
];
