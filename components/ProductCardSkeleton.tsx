import React from 'react'
import { clsx } from 'clsx'

type ProductCardSkeletonProps = {
  variant: 'category' | 'detail'
  showNewProduct?: boolean
}

export default function ProductCardSkeleton({ variant, showNewProduct = true }: ProductCardSkeletonProps) {
  const containerClasses = clsx(
    'flex flex-col',
    {
      'gap-y-8 md:gap-y-[52px] xl:gap-y-0 xl:gap-x-31.25 xl:flex-row xl:even:flex-row-reverse': variant === 'category',
      'gap-y-8': variant === 'detail' && showNewProduct,
      'gap-y-10': variant === 'detail' && !showNewProduct,
      'md:flex-row md:gap-y-0 md:gap-x-[69px] xl:gap-x-[124.5px]': variant === 'detail',
    }
  )

  const pictureWrapperClasses = clsx({
    'flex flex-col items-center justify-center xl:flex-1': variant === 'category',
    'flex flex-col rounded-lg md:flex-1 md:w-2/5 xl:w-1/2': variant === 'detail',
  })

  const pictureClasses = clsx({
    'flex flex-col items-center justify-center xl:flex-1': variant === 'category',
    'h-[327px] md:h-[480px] xl:h-[560px]': variant === 'detail',
  })

  const imgSkeletonClasses = clsx('rounded-lg animate-shimmer', {
    'w-full h-[327px] md:h-[352px] xl:h-[560px]': variant === 'category',
    'w-full h-full md:object-cover': variant === 'detail',
  })

  const contentWrapperClasses = clsx({
    'flex items-center justify-center xl:flex-1': variant === 'category',
    'flex flex-col items-center justify-center flex-1': variant === 'detail',
  })

  const contentClasses = clsx('flex flex-col', {
    'items-center justify-center text-center md:max-w-[83%] xl:text-left xl:items-start xl:max-w-[initial]': variant === 'category',
  })

  const newProductSkeletonClasses = clsx('animate-shimmer h-5', {
    'mb-4 w-32': variant === 'category',
    'mb-6 md:mb-[17px] w-32': variant === 'detail',
  })

  const titleSkeletonClasses = clsx('animate-shimmer', {
    'mb-4 md:mb-8 h-10 md:h-12 w-3/4': variant === 'category',
    'mb-6 md:mb-8 h-10 md:h-12 xl:h-12 w-4/5': variant === 'detail',
  })

  const descriptionSkeletonClasses = clsx('flex flex-col gap-2', {
    'mb-4 md:mb-6': variant === 'category',
    'mb-6 md:mb-8': variant === 'detail',
  })

  return (
    <div className={containerClasses}>
      <div className={pictureWrapperClasses}>
        <div className={pictureClasses}>
          <div className={imgSkeletonClasses}></div>
        </div>
      </div>
      
      <div className={contentWrapperClasses}>
        <div className={contentClasses}>
          {showNewProduct && (
            <div className={newProductSkeletonClasses}></div>
          )}
          
          <div className={titleSkeletonClasses}></div>
          
          <div className={descriptionSkeletonClasses}>
            <div className="h-6 w-full animate-shimmer"></div>
            <div className="h-6 w-5/6 animate-shimmer"></div>
            <div className="h-6 w-4/5 animate-shimmer"></div>
          </div>
          
          {variant === 'category' && (
            <div className="h-12 w-40 animate-shimmer"></div>
          )}
          
          {variant === 'detail' && (
            <>
              <div className="h-8 w-32 animate-shimmer mb-[31px]"></div>
              <div className="flex gap-4">
                <div className="h-12 w-32 animate-shimmer"></div>
                <div className="h-12 w-40 animate-shimmer"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}