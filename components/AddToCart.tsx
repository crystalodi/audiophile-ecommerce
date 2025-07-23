export default function AddToCart() {
  const buttonControlClasses ="flex items-center justify-center bg-transparent w-[33%] opacity-25 focus:outline-0"
  return (
    <div className="flex items-center gap-[16px]">
      <div className="inline-flex justify-center max-w-[120px] h-[48px] bg-audiophile-gray subtitle-text">
        <button className={buttonControlClasses}>-</button>
        <input name="quantity" autoComplete="off" className="w-[33%] focus:outline-0"/>
        <button className={buttonControlClasses}>+</button>
      </div>
      <button className="btn btn-orange">Add to cart</button>
    </div>
  )
}