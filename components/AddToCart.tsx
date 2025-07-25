"use client"
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { Slug } from "@/sanity.types";

export default function AddToCart({stock, slug}: {stock: number; slug: Slug}) {
  const [quantity, setQuantity] = useState(1)
  const isDisabled = stock === 0;

  const handleAddToCart = () => {
    // call state management
  };

  return (
    <div className="flex items-center gap-[16px]">
      <QuantitySelector maxQuantity={stock} quantity={quantity} onQuantityChange={setQuantity} disabled={isDisabled}/>
      <button className="btn btn-orange" onClick={handleAddToCart} disabled={isDisabled}>Add to cart</button>
    </div>
  )
}