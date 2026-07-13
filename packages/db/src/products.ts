import { prisma } from "./client";

export type ProductVariant = {
  label: string;
  price: number;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  currencySymbol: string;
  isFeatured: boolean;
  variants: ProductVariant[];
};

type ProductWithVariants = Awaited<ReturnType<typeof findProducts>>[number];

function toProduct(product: ProductWithVariants): Product {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    imageUrl: product.imageUrl,
    imageAlt: product.imageAlt,
    currencySymbol: product.currencySymbol,
    isFeatured: product.isFeatured,
    variants: product.variants.map((variant) => ({
      label: variant.label,
      price: variant.priceCents / 100,
    })),
  };
}

function findProducts() {
  return prisma.product.findMany({
    include: {
      variants: {
        orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProducts() {
  const products = await findProducts();

  return products.map(toProduct);
}

export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      variants: {
        orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(toProduct);
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      variants: {
        orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      },
    },
  });

  return product ? toProduct(product) : null;
}
