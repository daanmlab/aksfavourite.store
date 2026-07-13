"use client";

import { useMemo, useState } from "react";
import { Bookmark, PlusIcon } from "lucide-react";

import { Button } from "../../button";
import { Card, CardContent } from "../../card";
import { cn } from "../../../lib/utils";

export type ProductCardVariant = {
  label: string;
  price: number;
};

export type ProductCardProps = {
  title: string;
  imageUrl: string;
  imageAlt?: string;
  currency?: string;
  variants?: ProductCardVariant[];
  className?: string;
};

const fallbackVariants: ProductCardVariant[] = [{ label: "Default", price: 0 }];

export function ProductCard({
  title,
  imageUrl,
  imageAlt = "",
  currency = "$",
  variants = fallbackVariants,
  className,
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const selectedPrice = variants[selectedVariant]?.price ?? variants[0]?.price ?? 0;
  const hasMultipleVariants = variants.length > 1;

  const formattedPrice = useMemo(() => selectedPrice.toFixed(2), [selectedPrice]);

  return (
    <Card
      className={cn(
        "w-full max-w-[320px] mx-auto border-2 border-black shadow-none rounded-none overflow-hidden p-0 not-prose",
        className,
      )}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          {/* Keep this framework-agnostic; Next.js apps can wrap this component if image optimization is required. */}
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="h-full w-full object-cover"
          />

          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 rounded-none border-2 border-black"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark
              className={cn(
                "h-5 w-5 transition-colors",
                isBookmarked ? "fill-black text-black" : "text-foreground",
              )}
            />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-4 text-center">
            <h3 className="mb-1 text-2xl">{title}</h3>
            <p className="text-4xl font-bold">
              {currency}
              <span
                key={selectedVariant}
                className="inline-block animate-in fade-in slide-in-from-top-2 duration-300"
              >
                {formattedPrice}
              </span>
            </p>
          </div>

          {hasMultipleVariants ? (
            <div className="mb-6 flex justify-center gap-2">
              {variants.map((variant, index) => (
                <Button
                  key={variant.label}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVariant(index)}
                  className={cn(
                    "rounded-none border-2",
                    selectedVariant === index
                      ? "border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                      : "border-foreground text-foreground",
                  )}
                >
                  {variant.label}
                </Button>
              ))}
            </div>
          ) : null}

          <Button size="lg" className="w-full rounded-none">
            <PlusIcon className="ml-2 size-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
