import { prisma } from "../src/client";

const products = [
  {
    id: "mojo-soft-drink",
    title: "Mojo Soft Drink",
    description: "A crisp, refreshing soft drink for everyday favourites.",
    category: "Drinks",
    imageUrl:
      "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/products/mojo_can.png",
    imageAlt: "Mojo soft drink can",
    currencySymbol: "€",
    isFeatured: true,
    variants: [
      { label: "250 ML", priceCents: 125, sortOrder: 1 },
      { label: "500 ML", priceCents: 250, sortOrder: 2 },
    ],
  },
  {
    id: "pantry-starter-box",
    title: "Pantry Starter Box",
    description: "A curated set of staple goods to stock up your kitchen.",
    category: "Pantry",
    imageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Assorted grocery items in a basket",
    currencySymbol: "€",
    isFeatured: false,
    variants: [{ label: "Box", priceCents: 2499, sortOrder: 1 }],
  },
  {
    id: "fresh-fruit-picks",
    title: "Fresh Fruit Picks",
    description: "Seasonal fruit selected for freshness and flavour.",
    category: "Fresh",
    imageUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Fresh mixed fruit",
    currencySymbol: "€",
    isFeatured: false,
    variants: [{ label: "Pack", priceCents: 1250, sortOrder: 1 }],
  },
];

async function main() {
  for (const product of products) {
    const { variants, ...data } = product;

    await prisma.product.upsert({
      where: { id: product.id },
      create: {
        ...data,
        variants: {
          create: variants,
        },
      },
      update: {
        ...data,
        variants: {
          deleteMany: {},
          create: variants,
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
