import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="main-container">
      <div className="mt-4 md:mt-[33px] xl:mt-[79px] flex flex-col">
        <div className="mb-6 xl:mb-[52px]">
          <div className="h-6 w-20 animate-shimmer rounded"></div>
        </div>
        <section aria-label="Loading product details" className="mb-22">
          <ProductCardSkeleton variant="detail" showNewProduct={true} />
        </section>
        <section
          aria-label="Loading product features"
          className="mb-[121px] xl:mb-40"
        >
          <div className="flex flex-col xl:flex-row xl:gap-x-[125px]">
            <div className="flex flex-col mb-22 md:mb-30 xl:flex-1/3 xl:mb-0">
              <div className="h-8 w-24 animate-shimmer rounded mb-6 md:mb-8"></div>
              <div className="flex flex-col gap-y-3">
                <div className="h-6 w-full animate-shimmer rounded"></div>
                <div className="h-6 w-5/6 animate-shimmer rounded"></div>
                <div className="h-6 w-4/5 animate-shimmer rounded"></div>
                <div className="h-6 w-full animate-shimmer rounded"></div>
                <div className="h-6 w-3/4 animate-shimmer rounded"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-x-[11px] w-full xl:flex-1 xl:flex-col">
              <div className="h-8 w-32 md:flex-1 mb-6 xl:flex-[initial]">
                <div className="animate-shimmer rounded w-3/4 h-full"></div>
              </div>
              <div className="flex flex-col gap-y-2 md:flex-1 xl:flex-[initial]">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex gap-x-[21px]">
                    <div className="h-6 w-[18px] animate-shimmer rounded"></div>
                    <div className="h-6 w-24 animate-shimmer rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section aria-label="Loading product gallery" className="mb-30">
          <div className="grid grid-cols-1 md:grid-cols-(--product-gallery-grid-columns-md) gallery-image-grid gap-y-5 md:gap-x-[18px] xl:gap-y-8 xl:gap-x-[30px]">
            <div className="h-[174px] md:h-[174px] xl:h-[280px] animate-shimmer rounded-lg md:[grid-area:one]"></div>
            <div className="h-[174px] md:h-[174px] xl:h-[280px] animate-shimmer rounded-lg md:[grid-area:two]"></div>
            <div className="h-[368px] md:h-[368px] xl:h-[592px] animate-shimmer rounded-lg md:[grid-area:three]"></div>
          </div>
        </section>
        <section aria-label="Loading related products" className="mb-30">
          <div className="text-center w-full">
            <div className="h-8 w-48 animate-shimmer rounded mb-10 md:mb-13 xl:mb-16 mx-auto"></div>
            <div className="flex flex-col gap-y-14 md:flex-row md:gap-x-[11px] xl:gap-x-[30px]">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center md:flex-1">
                  <div className="w-full h-[120px] md:h-[318px] animate-shimmer rounded-lg mb-8 md:mb-10"></div>
                  <div className="h-8 w-32 animate-shimmer rounded mb-8"></div>
                  <div className="h-12 w-40 animate-shimmer rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}