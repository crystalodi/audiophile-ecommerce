"use client"
import Image from "next/image"
import { useRef, useState } from "react"
import CartDialog from "./CartDialog"
import { useCartStore } from "@/store/cartStore"
import LogoNavMenu from "./LogoNavMenu"
import HamburgerIcon from "../public/icon-hamburger.svg"
import CartIcon from "../public/icon-cart.svg"

export default function Header() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const totalItems = useCartStore(state => state.getTotalItems());
  const hasHydrated = useCartStore(state => state.hasHydrated);
  
  return (
    <header className="bg-audiophile-black relative z-3">
      <div className="flex items-center py-[32px] main-container gap-x-[42px] text-white" ref={navRef}>

        {/* Hamburger Menu - Mobile & Tablet only */}
        <div className="flex items-center flex-1 md:flex-[initial] xl:hidden">
          <button 
            className="cursor-pointer" 
            aria-label="Open mobile menu"
            aria-expanded="false"
            aria-controls="mobile-navigation"
          >
            <HamburgerIcon width={16} height={15} className="fill-current" aria-hidden="true"/>
          </button>
        </div>
        
        <LogoNavMenu />
        
        {/* Cart */}
        <div className="flex items-center justify-end flex-1">
          {hasHydrated && totalItems > 0 ? (
            <button 
              aria-label={`Open shopping cart with ${totalItems} items`}
              className="cursor-pointer relative" 
              onClick={() => setIsCartModalOpen(true)}
            >
              <CartIcon width={23} height={20} className="fill-current" aria-hidden="true"/>
              <span 
                className="absolute -top-2 -right-2 bg-audiophile-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                aria-label={`${totalItems} items in cart`}
              >
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            </button>
          ) : (
            <button 
              aria-label="Shopping cart is empty"
              className="cursor-default"
            >
              <CartIcon width={23} height={20} className="fill-current" aria-hidden="true"/>
            </button>
          )}
        </div>
        
        <CartDialog open={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} anchorRef={navRef}/>
      </div>
      <div className="w-full md:main-container">
        <div className="h-[1px] bg-audiophile-divider" aria-hidden="true" />
      </div>
    </header>
  )
}
