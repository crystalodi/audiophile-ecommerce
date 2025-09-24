"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import CartDialog from "./CartDialog"

export default function NavMenu() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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
        <button aria-label="Open shopping cart" className="cursor-pointer" onClick={() => setIsCartModalOpen(true)}>
          <Image src="/icon-cart.svg" width={23} height={20} alt="" />
        </button>
        <CartDialog open={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} anchorRef={navRef}/>
      </nav>
    </header>
  )
}
