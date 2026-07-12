import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          aksfavourite.store
        </h1>
        <Button>Shop now</Button>
      </div>
    </main>
  );
}
