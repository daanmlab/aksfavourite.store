import { Catalog } from "../components/catalog";

// Keep the catalog request-time rendered so local/dev DB data is not read during build.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <section className="grid min-h-[50vh] place-items-center px-6 py-16 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            aksfavourite.store
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Favourite everyday products, curated in one simple catalog.
          </p>
        </div>
      </section>
      <Catalog />
    </main>
  );
}
