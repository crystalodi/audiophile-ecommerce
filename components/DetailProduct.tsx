import { DetailProductType } from '@/lib/custom.types'
import { imageUrl } from '@/lib/imageUrl'
import { cn } from '@/lib/utils'
import AddToCart from './AddToCart';

export default function DetailProduct(props: DetailProductType) {
  const {
    slug,
    isNewProduct,
    description,
    productName,
    category,
    mediaImage,
    stock,
    price
  } = props

  const cardClasses = cn(
    'flex',
    'flex-col',
    'w-full',
    {
      'gap-y-8': isNewProduct,
      'gap-y-10': !isNewProduct
    },
    "md:flex-row",
    "md:gap-y-0",
    "md:gap-x-[69px]",
    "xl:gap-x-[124.5px]"
  );

  return (
    <article className={cardClasses}>
      <div className="flex flex-col rounded-lg md:flex-1 md:w-2/5 xl:w-1/2">
        <picture className='md:max-h-[481px] xl:max-h-[initial]'>
          <source
            srcSet={imageUrl(mediaImage.desktop.asset).url()}
            media="(min-width: 1280px)"
          />
          <source
            srcSet={imageUrl(mediaImage.tablet.asset).url()}
            media="(min-width: 768px)"
          />
          <img src={imageUrl(mediaImage.mobile.asset).url()} alt={productName} className="rounded-lg h-full w-full md:object-cover" loading="lazy"/>
        </picture>
      </div>
      <div className='flex flex-col items-center justify-center flex-1'>
        <div className='flex flex-col'>
          {isNewProduct && (<div className='overline-text text-audiophile-orange mb-6 md:mb-[17px]'>new product</div>)}
          <h1 className='heading-4 mb-6 md:mb-8 xl:heading-2'>{productName}</h1>
          <p className='body-text opacity-50 mb-6 md:mb-8'>{description}</p>
          <div className='font-bold mb-[31px]'>{`$ ${price.toLocaleString('en-US')}`}</div>
          <div>
            <AddToCart stock={stock} slug={slug} productName={productName}/>
          </div>
        </div>
      </div>
    </article>
  )
}