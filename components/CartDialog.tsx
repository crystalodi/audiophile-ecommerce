"use client";

import { RefObject } from "react";
import Dialog from "./Dialog";
import { CartItem, useCartStore } from "@/store/cartStore";

type CartDialogProps = {
  open: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLButtonElement | null>
}

function CartDialog({open, onClose, anchorRef}: CartDialogProps) {
  const cartItems = useCartStore(state => state.cartItems);
  const hasHydrated = useCartStore(state => state.hasHydrated);
  const clearCart = useCartStore(state => state.clearCart);

  const items = Array.from(cartItems.values());
  const displayItems = hasHydrated ? items : [];

  const removeAllCartItems = () => clearCart();

  return (
    <Dialog open={open} onClose={onClose} className="w-[87.2%] md:w-[377px]" anchorRef={anchorRef}>
      <div className="max-h-[488px] py-[31px] pl-[33px] pr-[31px]">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-[31px]">
            <h1 className="heading-6">cart {`(${displayItems.length})`}</h1>
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