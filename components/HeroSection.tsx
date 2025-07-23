export default function HeroSection() {
  return (
    <section aria-label="New Product" className="bg-audiophile-black">
      <div className="max-w-[1920px] flex justify-center relative mx-auto">
        <picture className="w-full flex justify-center items-center">
          <source 
            srcSet="/images/home/desktop/image-hero.jpg" 
            media="(min-width: 1024px)" 
          />
          <source 
            srcSet="/images/home/tablet/image-header.jpg" 
            media="(min-width: 768px)" 
          />
          <img 
            src="/images/home/mobile/image-header.jpg" 
            alt="XX99 Mark II Headphones"
          />
        </picture>
      </div>
    </section>
  )
}