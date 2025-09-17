import ProductCard from "@/components/ProductCard";
import { getStaticPaths } from "@/lib/getStaticPaths";
import { cn } from "@/lib/utils";
import { getProductsByCategory } from "@/sanity/lib/api";
import { notFound } from "next/navigation";

async function CategoryPage({ params }: { params: Promise<{ category: string }>}) {
  const { category } = await params;
  const isValidRoute = await getStaticPaths(category);
  if (!isValidRoute) return notFound();

  const products = await getProductsByCategory(category);

  return (
    <>
      <header className="flex justify-center py-8 bg-audiophile-black md:pt-[105px] md:pb-[97px] xl:pt-[98px] xl:pb-[97px]">
        <h1 className="text-white heading-4 md:heading-2">{category}</h1>
      </header>
      <div className="main-container">
        <section className="flex flex-col mt-16 md:mt-30 xl:mt-40 justify-center items-center gap-y-30 mb-30" aria-label={`${category} products`}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard product={product} key={product._id} variant="category"/>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </section>
      </div>
    </>
  );
}

export default CategoryPage;