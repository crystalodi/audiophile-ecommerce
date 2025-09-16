"use client"
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { Slug } from "@/sanity.types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

export default function AddToCart({stock, slug, productName}: {stock: number; slug: Slug, productName: string}) {
  const [quantity, setQuantity] = useState(1);
  const addCartItem = useCartStore(state => state.addCartItem);
  const addToast = useToastStore(state => state.addToast);
  const isDisabled = stock === 0;

  const handleAddToCart = () => {
    addCartItem({
      slug: slug.current,
      quantity
    });
    addToast(`${productName} added to cart!`, 'success', 3000);
    setQuantity(1);
  };

  return (
    <div className="flex items-center gap-[16px]">
      <QuantitySelector maxQuantity={stock} quantity={quantity} onQuantityChange={setQuantity} disabled={isDisabled} variant="large"/>
      <button className="btn btn-orange" onClick={handleAddToCart} disabled={isDisabled}>
        Add to cart
      </button>
    </div>
  )
}