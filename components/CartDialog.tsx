"use client";

import Dialog from "./Dialog";
import { useCartStore } from "@/store/cartStore";

type CartDialogProps = {
  open: boolean;
  onClose: () => void;
}

function CartDialog({open, onClose}: CartDialogProps) {
  const cartItems = useCartStore(state => state.cartItems);
  const hasHydrated = useCartStore(state => state.hasHydrated);

  const items = Array.from(cartItems.values());
  const displayItems = hasHydrated ? items : [];

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="max-w-sm max-h-[488px] py-[31px] pl-[33px] pr-[31px]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-between items-center">
            <h1 className="heading-6">cart {`(${displayItems.length})`}</h1>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default CartDialog;