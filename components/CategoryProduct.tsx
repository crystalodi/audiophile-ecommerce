import React from 'react'
import { imageUrl } from '@/lib/imageUrl'
import Link from 'next/link';
import { CategoryProductType } from '@/lib/custom.types';

export default function CategoryProduct(product: CategoryProductType) {
  const {
    slug,
    category,
    mediaImage,
    productName,
    isNewProduct,
    description
  } = product;

  const productHref = `/${category.categoryName.toLowerCase()}/${slug.current}`;

  return (
    <article className="flex flex-col gap-y-8 md:gap-y-[52px] xl:gap-y-0 xl:gap-x-31.25 xl:flex-row xl:even:flex-row-reverse">
      <picture className="flex flex-col items-center justify-center xl:flex-1">
        <source
          srcSet={imageUrl(mediaImage.desktop.asset).url()}
          media="(min-width: 1280px)"
        />
        <source
          srcSet={imageUrl(mediaImage.tablet.asset).url()}
          media="(min-width: 768px)"
        />
        <img src={imageUrl(mediaImage.mobile.asset).url()} alt={productName} className="rounded-lg" loading="lazy"/>
      </picture>
      <div className="flex items-center justify-center xl:flex-1">
        <div className="flex flex-col items-center justify-center text-center md:max-w-[83%] xl:text-left xl:items-start xl:max-w-[initial]">
          { isNewProduct && (<div className='overline-text text-audiophile-orange mb-4'>new product</div>) }
          <h2 className='mb-4 md:mb-8 heading-4 md:heading-2'>{productName}</h2>
          <p className='body-text text-black opacity-50 mb-4 md:mb-6'>{description}</p>
          <Link href={productHref} className='btn btn-orange' aria-label={`View details for ${productName}`}>see product</Link>
        </div>
      </div>
    </article>
  )
}