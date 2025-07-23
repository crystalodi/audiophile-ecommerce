import Image from "next/image"
import Link from "next/link"

export default function NavMenu() {
  return (
    <nav className="flex flex-col justify-center items-center bg-audiophile-black relative z-[10000000]">
      <div className="flex items-center justify-between border-b-[1px] border-b-(--color-audiophile-divider) py-[32px] px-[24px] md:px-[42px] xl:px-[164px] w-full">
        <Image src="/icon-hamburger.svg" width={16} height={15} alt="menu" className="xl:hidden"/>
        <Image src="/logo.svg" width={143} height={25} alt="audiophile"/>
        <ul className="hidden xl:flex list-none justify-between text-white subtitle-text gap-[34px]">
          <li>
            <Link href="/" className="hover:text-audiophile-orange">Home</Link>
          </li>
          <li>
            <Link href="/headphones" className="hover:text-audiophile-orange">Headphones</Link>
          </li>
          <li>
            <Link href="/speakers" className="hover:text-audiophile-orange">Speakers</Link>
          </li>
          <li>
            <Link href="/earphones" className="hover:text-audiophile-orange">Earphones</Link>
          </li>
        </ul>
        <Image src="/icon-cart.svg" width={23} height={20} alt="My Shopping Cart"/>
      </div>
    </nav>
  )
}
