import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function Loading() {
  return (
    <>
      <header className="flex justify-center py-8 bg-audiophile-black md:pt-[105px] md:pb-[97px] xl:pt-[98px] xl:pb-[97px]">
        <div className="h-8 md:h-12 w-32 md:w-48 animate-shimmer"></div>
      </header>
      <div className="main-container">
        <section className="flex flex-col mt-16 md:mt-30 xl:mt-40 justify-center items-center gap-y-30 mb-30 w-full" aria-label="Loading products">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProductCardSkeleton 
              key={index} 
              variant="category" 
              showNewProduct={index % 2 === 0}
            />
          ))}
        </section>
      </div>
    </>
  );
}