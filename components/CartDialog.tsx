"use client";

import { RefObject } from "react";
import Image from "next/image";
import Dialog from "./Dialog";
import { useCartStore, useCartWithProductDetail } from "@/store/cartStore";
import QuantitySelector from "./QuantitySelector";

type CartDialogProps = {
  open: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLButtonElement | null>
}

function CartProduct({ slug, quantity, productName, price, image, maxQuantity }: {
  slug: string;
  quantity: number;
  productName: string;
  price: number;
  image: string;
  maxQuantity: number;
}) {

  const updateQuantity = useCartStore(state => state.updateQuantity);
  const deleteCartItem = useCartStore(state => state.deleteCartItem);

  const onQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      deleteCartItem(slug);
    } else {
      updateQuantity({ slug, quantity: newQuantity });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="h-16 w-16 bg-audiophile-gray">
        <Image src={image} alt={`${productName} X ${quantity}`} objectFit="contain" objectPosition="center" width={64} height={64}/>
      </div>
      <div className="flex flex-column justify-center">
        <div>{productName}</div>
        <div>{`$ ${price.toLocaleString('en-US')}`}</div>
      </div>
      <div className="ml-auto">
        <QuantitySelector maxQuantity={maxQuantity} quantity={quantity} onQuantityChange={onQuantityChange} minQuantity={0}/>
      </div>
    </div>
  );
}

function CartDialog({open, onClose, anchorRef}: CartDialogProps) {
  const clearCart = useCartStore(state => state.clearCart);
  const { itemsWithPrices, isLoading } = useCartWithProductDetail();

  const total = itemsWithPrices.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const removeAllCartItems = () => clearCart();

  return (
    <Dialog open={open} onClose={onClose} className="w-[87.2%] md:w-[377px]" anchorRef={anchorRef}>
      <div className="max-h-[488px] py-[31px] pl-[33px] pr-[31px]">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-[31px]">
            <h1 className="heading-6">cart {`(${0})`}</h1>
            <button className="btn-transparent body-text text-black/50 cursor-pointer underline" onClick={removeAllCartItems}>Remove All</button>
          </div>
          <div className="flex flex-col gap-y-3.5">
            
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default CartDialog;