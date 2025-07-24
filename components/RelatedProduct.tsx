import { RelatedProductType } from '@/lib/custom.types'
import { imageUrl } from '@/lib/imageUrl';
import Link from 'next/link';

export default function RelatedProduct(props: RelatedProductType) {
  const {
    productName,
    mediaImage,
    slug,
    category,
    shortName
  } = props;

  const productHref = `/${category.categoryName.toLowerCase()}/${slug.current}`;

  return (
    <div className="flex flex-col gap-y-10 md:flex-1">
      <div className='flex flex-col items-center justify-center bg-audiophile-gray rounded-[8px]'>
        <picture className='h-30 w-full md:h-[318px]'>
          <source
            srcSet={imageUrl(mediaImage.desktop.asset).url()}
            media="(min-width: 1280px)"
          />
          <source
            srcSet={imageUrl(mediaImage.tablet.asset).url()}
            media="(min-width: 768px)"
          />
          <img src={imageUrl(mediaImage.mobile.asset).url()} alt={productName} loading="lazy" className='rounded-[8px] h-full w-full object-contain object-center md:object-cover'/>
        </picture>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-black mb-8 heading-5">{shortName ? shortName : productName}</h3>
        <Link href={productHref} className="btn btn-orange" aria-label={`View details for ${productName}`}>see product</Link>
      </div>
    </div>
  )
}