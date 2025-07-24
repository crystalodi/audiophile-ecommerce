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
    {
      'gap-y-8': isNewProduct,
      'gap-y-10': !isNewProduct
    }
  );

  const formattedPrice = `$ ${price.toLocaleString('en-US')}`;

  const addToCart = () => console.log('add to cart');

  return (
    <article className={cardClasses}>
      <picture className="flex flex-col">
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
      <div className='flex'>
        <div className='flex flex-col'>
          {isNewProduct && (<div className='overline-text text-audiophile-orange mb-6'>new product</div>)}
          <h1 className='heading-4 mb-6 max-w-50'>{productName}</h1>
          <p className='body-text opacity-50 mb-6'>{description}</p>
          <div className='font-bold mb-[31px]'>{formattedPrice}</div>
          <div>
            <AddToCart stock={stock}/>
          </div>
        </div>
      </div>
    </article>
  )
}