"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import CartDialog from "./CartDialog"
import { useCartStore } from "@/store/cartStore"

export default function NavMenu() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const totalItems = useCartStore(state => state.getTotalItems());
  
  return (
    <header className="bg-audiophile-black relative z-3">
      <nav className="flex items-center justify-between border-b-[1px] border-b-audiophile-divider py-[32px] px-[24px] md:px-[42px] xl:px-[164px] w-full" aria-label="Main navigation" ref={navRef}>
        <button 
          className="xl:hidden cursor-pointer" 
          aria-label="Open mobile menu"
          aria-controls="mobile-menu"
        >
          <Image src="/icon-hamburger.svg" width={16} height={15} alt="" />
        </button>
        
        <Link href="/" aria-label="Audiophile home">
          <Image src="/logo.svg" width={143} height={25} alt="Audiophile" />
        </Link>
        
        <ul className="hidden xl:flex list-none justify-between text-white subtitle-text gap-[34px]" role="menubar">
          <li role="none">
            <Link href="/" className="hover:text-audiophile-orange" role="menuitem">Home</Link>
          </li>
          <li role="none">
            <Link href="/headphones" className="hover:text-audiophile-orange" role="menuitem">Headphones</Link>
          </li>
          <li role="none">
            <Link href="/speakers" className="hover:text-audiophile-orange" role="menuitem">Speakers</Link>
          </li>
          <li role="none">
            <Link href="/earphones" className="hover:text-audiophile-orange" role="menuitem">Earphones</Link>
          </li>
        </ul>
        
        {totalItems > 0 ? (
          <button 
            aria-label={`Open shopping cart (${totalItems} items)`}
            className="cursor-pointer relative" 
            onClick={() => setIsCartModalOpen(true)}
          >
            <Image src="/icon-cart.svg" width={23} height={20} alt="" />
            <span 
              className="absolute -top-2 -right-2 bg-audiophile-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              aria-hidden="true"
            >
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          </button>
        ) : (
          <Image 
            src="/icon-cart.svg" 
            width={23} 
            height={20} 
            alt="Shopping cart is empty" 
            className="cursor-auto"
          />
        )}
        
        <CartDialog open={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} anchorRef={navRef}/>
      </nav>
    </header>
  )
}
