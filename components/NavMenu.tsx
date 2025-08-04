"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Dialog from "./Dialog"

export default function NavMenu() {
  const [isCartDialogOpen, setCartIsDialogOpen] = useState(false)

  const openCartDialog = () => setCartIsDialogOpen(true)
  const closeCartDialog = () => setCartIsDialogOpen(false)

  return (
    <header className="bg-audiophile-black relative z-[10000000]">
      <nav className="flex items-center justify-between border-b-[1px] border-b-audiophile-divider py-[32px] px-[24px] md:px-[42px] xl:px-[164px] w-full" aria-label="Main navigation">
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
        
        <button aria-label="Open shopping cart" className="cursor-pointer" onClick={openCartDialog}>
          <Image src="/icon-cart.svg" width={23} height={20} alt="" />
        </button>
      </nav>
      <Dialog isOpen={isCartDialogOpen} onClose={closeCartDialog} />
    </header>
  )
}
