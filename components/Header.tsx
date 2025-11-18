"use client";
import { useRef, useState } from "react";
import CartDialog from "./CartDialog";
import NavMenuModal from "./NavMenuModal";
import { useCartStore } from "@/store/cartStore";
import LogoNavMenu from "./LogoNavMenu";
import HamburgerIcon from "../public/icon-hamburger.svg";
import CartIcon from "../public/icon-cart.svg";

export default function Header() {
	const [isCartModalOpen, setIsCartModalOpen] = useState(false);
	const [isNavModalOpen, setIsNavModalOpen] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const totalItems = useCartStore(state => state.getTotalItems());
	const hasHydrated = useCartStore(state => state.hasHydrated);

	const openNavModal = () => {
		setIsCartModalOpen(false); // Close cart when opening nav
		setIsNavModalOpen(true);
	};

	const openCartModal = () => {
		setIsNavModalOpen(false); // Close nav when opening cart
		setIsCartModalOpen(true);
	};

	const closeCartModal = () => {
		setIsCartModalOpen(false);
	};

	const closeNavModal = () => {
		setIsNavModalOpen(false);
	};

	return (
		<header className="bg-audiophile-black relative z-10" ref={headerRef}>
			<div
				className="flex items-center py-[32px] main-container gap-x-[42px]"
				ref={navRef}
			>
				{/* Hamburger Menu - Mobile & Tablet only */}
				<div className="flex items-center flex-1 md:flex-[initial] xl:hidden">
					<button
						className="cursor-pointer"
						aria-label="Open mobile menu"
						aria-expanded={isNavModalOpen}
						aria-controls="mobile-navigation"
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();
							openNavModal();
						}}
					>
						<HamburgerIcon
							width={16}
							height={15}
							className="fill-current"
							aria-hidden="true"
						/>
					</button>
				</div>

				<LogoNavMenu menuType="header" />

				{/* Cart */}
				<div className="flex items-center justify-end flex-1">
					{hasHydrated && totalItems > 0 ? (
						<button
							aria-label={`Open shopping cart with ${totalItems} items`}
							className="cursor-pointer relative"
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
								openCartModal();
							}}
						>
							<CartIcon
								width={23}
								height={20}
								className="fill-current"
								aria-hidden="true"
							/>
							<span
								className="absolute -top-2 -right-2 bg-audiophile-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
								aria-label={`${totalItems} items in cart`}
							>
								{totalItems > 99 ? "99+" : totalItems}
							</span>
						</button>
					) : (
						<button
							aria-label="Shopping cart is empty"
							className="cursor-default"
						>
							<CartIcon
								width={23}
								height={20}
								className="fill-current"
								aria-hidden="true"
							/>
						</button>
					)}
				</div>
			</div>
			<CartDialog
				open={isCartModalOpen}
				onClose={closeCartModal}
				anchorRef={navRef}
			/>
			<NavMenuModal
				open={isNavModalOpen}
				onClose={closeNavModal}
				anchorRef={headerRef}
			/>
			<div className="w-full md:main-container">
				<div className="h-[1px] bg-audiophile-divider" aria-hidden="true" />
			</div>
		</header>
	);
}
