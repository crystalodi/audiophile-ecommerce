"use client";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import CartDialog from "@/components/cart/CartDialog";
import { useCartStore } from "@/store/cartStore";
import LogoNavMenu from "@/components/layout/Navigation";
import HamburgerIcon from "@/public/icon-hamburger.svg";
import CartIcon from "@/public/icon-cart.svg";

const BREAKPOINT_XL = 1280;
export default function Header() {
	const [isCartModalOpen, setIsCartModalOpen] = useState(false);
	const [isNavModalOpen, setIsNavModalOpen] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);
	const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
	const navContainerRef = useRef<HTMLDivElement>(null);
	const totalItems = useCartStore(state => state.totalItems);
	const hasHydrated = useCartStore(state => state.hasHydrated);

	const openNavModal = () => {
		setIsCartModalOpen(false);
		setIsNavModalOpen(true);
	};

	const openCartModal = () => {
		setIsNavModalOpen(false);
		setIsCartModalOpen(true);
	};

	const closeCartModal = () => {
		setIsCartModalOpen(false);
	};

	const closeNavModal = () => {
		setIsNavModalOpen(false);
		hamburgerButtonRef.current?.focus();
	};

	// Combine both useEffects into one
	useEffect(() => {
		const mainElement = document.querySelector("main");
		const footerElement = document.querySelector("footer");

		if (!isNavModalOpen || !navContainerRef.current) {
			// Cleanup when nav is closed
			if (mainElement) {
				mainElement.removeAttribute("inert");
				mainElement.removeAttribute("aria-hidden");
				mainElement.style.pointerEvents = "";
			}
			if (footerElement) {
				footerElement.removeAttribute("inert");
				footerElement.removeAttribute("aria-hidden");
				footerElement.style.pointerEvents = "";
			}
			return;
		}

		const container = navContainerRef.current;

		if (mainElement) {
			mainElement.setAttribute("inert", "");
			mainElement.setAttribute("aria-hidden", "true");
			mainElement.style.pointerEvents = "none";
		}
		if (footerElement) {
			footerElement.setAttribute("inert", "");
			footerElement.setAttribute("aria-hidden", "true");
			footerElement.style.pointerEvents = "none";
		}

		const focusableElements = container.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[
			focusableElements.length - 1
		] as HTMLElement;

		const handleTab = (e: KeyboardEvent) => {
			if (e.key !== "Tab") return;

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement?.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement?.focus();
				}
			}
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeNavModal();
			}
		};

		firstElement?.focus();

		document.addEventListener("keydown", handleTab);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("keydown", handleTab);
			document.removeEventListener("keydown", handleEscape);

			if (mainElement) {
				mainElement.removeAttribute("inert");
				mainElement.removeAttribute("aria-hidden");
				mainElement.style.pointerEvents = "";
			}
			if (footerElement) {
				footerElement.removeAttribute("inert");
				footerElement.removeAttribute("aria-hidden");
				footerElement.style.pointerEvents = "";
			}
		};
	}, [isNavModalOpen]);

	useLayoutEffect(() => {
		const handleScreenResize = () => {
			if (window.innerWidth >= BREAKPOINT_XL && isNavModalOpen) {
				setIsNavModalOpen(false);
			}
		};
		window.addEventListener("resize", handleScreenResize);
		return () => window.removeEventListener("resize", handleScreenResize);
	}, [isNavModalOpen]);

	return (
		<>
			<header className="bg-audiophile-black relative z-50">
				<div
					className="main-container flex items-center gap-x-[42px] py-[32px]"
					ref={navRef}
				>
					<div className="flex flex-1 items-center md:flex-[initial] xl:hidden">
						<button
							ref={hamburgerButtonRef}
							className="cursor-pointer"
							aria-label="Open mobile menu"
							aria-expanded={isNavModalOpen}
							aria-controls="mobile-navigation"
							aria-haspopup="menu"
							onClick={openNavModal}
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

					<div className="flex flex-1 items-center justify-end">
						{hasHydrated && totalItems > 0 ? (
							<button
								aria-label={`Open shopping cart with ${totalItems} items`}
								aria-haspopup="dialog"
								aria-expanded={isCartModalOpen}
								className="relative cursor-pointer"
								onClick={openCartModal}
							>
								<CartIcon
									width={23}
									height={20}
									className="fill-current"
									aria-hidden="true"
								/>
								<span
									className="bg-audiophile-orange absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"
									aria-label={`${totalItems} items in cart`}
								>
									{totalItems > 99 ? "99+" : totalItems}
								</span>
							</button>
						) : (
							<button
								aria-label="Shopping cart is empty"
								aria-haspopup="dialog"
								aria-expanded={isCartModalOpen}
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
				<div className="md:main-container w-full">
					<div className="bg-audiophile-divider h-[1px]" aria-hidden="true" />
				</div>
			</header>

			{isNavModalOpen &&
				typeof document !== "undefined" &&
				createPortal(
					<>
						<div
							className="fixed inset-0 z-30 bg-black/40"
							onClick={closeNavModal}
							aria-hidden="true"
						/>
						<div
							ref={navContainerRef}
							className="absolute top-[90px] left-0 z-50 w-full rounded-b-lg bg-white px-6 pt-8 pb-[35px]"
							role="menu"
							aria-labelledby="mobile-nav-label"
							id="mobile-navigation"
						>
							<div id="mobile-nav-label" className="sr-only">
								Mobile Navigation Menu
							</div>
							<LogoNavMenu menuType="content" onNavigate={closeNavModal} />
						</div>
					</>,
					document.body
				)}
		</>
	);
}
