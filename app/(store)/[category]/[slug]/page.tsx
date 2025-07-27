import { getProductDetail } from "@/sanity/lib/api";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { imageUrl } from '@/lib/imageUrl'
import RelatedProduct from "@/components/RelatedProduct";
import DetailProduct from "@/components/DetailProduct";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  const detailProduct = await getProductDetail(slug);
  if (!detailProduct) return notFound();

  const {
    productName,
    features,
    includes,
    description,
    mediaImage,
    isNewProduct,
    gallery: {
      first,
      second,
      third
    },
    category,
    stock,
    price,
    others,
    ...restProps
  } = detailProduct

  const product = {
    slug: restProps.slug,
    productName,
    description,
    isNewProduct,
    category,
    stock,
    price,
    mediaImage
  };

  return (
    <div className="main-container">
      <div className="mt-4 md:mt-[33px] xl:mt-[79px] flex flex-col">
        <div className="mb-6 xl:mb-[52px]">
          <Link href={`/${category.categoryName}`} className="body-text opacity-50">Go Back</Link>
        </div>
        <section aria-label={`Add ${productName} to cart`} className="mb-22">
          <DetailProduct {...product}/>
        </section>
        <section aria-label={`${productName} features and includes`} className="mb-[121px] xl:mb-40">
          <div className="flex flex-col xl:flex-row xl:gap-x-[125px]">
            <div className="flex flex-col mb-22 md:mb-30 xl:flex-1/3 xl:mb-0">
              <h2 className="mb-6 md:mb-8 heading-5 md:heading-3">Features</h2>
              <div className="opacity-50 prose max-w-none body-text">
                {Array.isArray(features) && (<PortableText value={features}/>)}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-x-[11px] w-full xl:flex-1 xl:flex-col">
              <h2 className="md:flex-1 mb-6 xl:flex-[initial] heading-5 md:heading-3">in the box</h2>
              <ul className="list-none flex flex-col gap-y-2 body-text capitalize md:flex-1 xl:flex-[initial]">
                {includes?.map(item => (
                  <li key={item._key} className="flex gap-x-[21px]">
                    <div className="text-audiophile-orange font-bold basis-[18px]">{item.quantity}x</div>
                    <div className="opacity-50">{item.item}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section aria-label={`${productName} image gallery`} className="mb-30">
          <div className="grid grid-cols-1 md:grid-cols-(--product-gallery-grid-columns-md) gallery-image-grid gap-y-5 md:gap-x-[18px] xl:gap-y-8 xl:gap-x-[30px]">
            <picture className="flex flex-col md:[grid-area:one]">
              <source
                srcSet={imageUrl(first.desktop.asset).url()}
                media="(min-width: 1280px)"
              />
              <source
                srcSet={imageUrl(first.tablet.asset).url()}
                media="(min-width: 768px)"
              />
              <img src={imageUrl(first.mobile.asset).url()} alt={productName} className="rounded-lg h-full" loading="lazy"/>
            </picture>
            <picture className="flex flex-col md:[grid-area:two]">
              <source
                srcSet={imageUrl(second.desktop.asset).url()}
                media="(min-width: 1280px)"
              />
              <source
                srcSet={imageUrl(second.tablet.asset).url()}
                media="(min-width: 768px)"
              />
              <img src={imageUrl(second.mobile.asset).url()} alt={productName} className="rounded-lg h-full" loading="lazy"/>
            </picture>
            <picture className="flex flex-col md:[grid-area:three]">
              <source
                srcSet={imageUrl(third.desktop.asset).url()}
                media="(min-width: 1280px)"
              />
              <source
                srcSet={imageUrl(third.tablet.asset).url()}
                media="(min-width: 768px)"
              />
              <img src={imageUrl(third.mobile.asset).url()} alt={productName} className="rounded-lg h-full" loading="lazy"/>
            </picture>
          </div>
        </section>
        <section aria-label="products you might also like" className="mb-30">
          <div className="text-center w-full">
            <h2 className="mb-10 md:mb-13 xl:mb-16 heading-5 md:heading-3">you may also like</h2>
            <div className="flex flex-col gap-y-14 md:flex-row md:gap-x-[11px] xl:gap-x-[30px]">
              {others?.map(other => (
              <RelatedProduct
                key={other.slug.current}
                {...other}
              />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}