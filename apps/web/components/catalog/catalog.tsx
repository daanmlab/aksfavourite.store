import { getProducts } from "@repo/db/products";
import { ProductCard } from "@repo/ui/product-card";

export async function Catalog() {
  const products = await getProducts();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-10 max-w-2xl space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Catalog
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Shop favourites
        </h2>
        <p className="text-muted-foreground">
          Browse products retrieved from the database through the product store
          layer.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            imageUrl={product.imageUrl}
            imageAlt={product.imageAlt}
            currency={product.currencySymbol}
            variants={product.variants}
          />
        ))}
      </div>
    </section>
  );
}
