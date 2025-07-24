"use client"
import { cn } from "@/lib/utils";
import { useState } from "react";

type AddToCartProps = {
  stock: number;
}

export default function AddToCart({stock}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1)
  const buttonControlClasses = cn(
    "flex",
    "items-center",
    "justify-center",
    "bg-transparent",
    "w-[33%]",
    "opacity-25",
    "focus:outline-0",
    "hover:cursor-pointer",
    "disabled:hover:cursor-auto"
  );

  const isDisabled = stock === 0

  const handleAddToCart = () => {

  }

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const num = Math.max(1, Math.min(stock, Number(value) || 1));
    setQuantity(num);
  }

  return (
    <div className="flex items-center gap-[16px]">
      <div className="inline-flex justify-center max-w-[120px] h-[48px] bg-audiophile-gray subtitle-text">
        <button className={buttonControlClasses} disabled={isDisabled}>-</button>
        <input name="quantity" autoComplete="off" className="w-[33%] text-center focus:outline-0" value={quantity} onChange={handleQuantityInputChange} disabled={isDisabled}/>
        <button className={buttonControlClasses} disabled={isDisabled}>+</button>
      </div>
      <button className="btn btn-orange" onClick={handleAddToCart}>Add to cart</button>
    </div>
  )
}