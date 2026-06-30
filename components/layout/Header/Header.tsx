"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import CartDialog from "@/components/cart/CartDialog";
import HamburgerIcon from "@/assets/icons/icon-hamburger.svg";
import CartIcon from "@/assets/icons/icon-cart.svg";
import NavigationList from "@/components/layout/Navigation/NavigationList";
import { useRouter } from "next/navigation";
import { useCartDataStore } from "@/store/cartDataStore";
import NavigationLogo from "@/components/layout/Navigation/NavigationLogo";
import type { NavigationItem } from "@/sanity/lib/getResolvedNavigation";

const BREAKPOINT_XL = 1280;

interface HeaderProps {
	headerNavigationItems: NavigationItem[];
	mobileNavigationItems: NavigationItem[];
	disableCartDialog?: boolean;
}

function CartBadge() {
	const [mounted, setMounted] = useState(false);
	const totalItems = useCartDataStore(state => state.totalItems);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || totalItems === 0) {
		return null;
	}

	return (
		<span
			className="bg-audiophile-orange absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"
			aria-label={`${totalItems} items in cart`}
		>
			{totalItems > 99 ? "99+" : totalItems}
		</span>
	);
}

export default function Header({
	headerNavigationItems,
	mobileNavigationItems,
	disableCartDialog,
}: HeaderProps) {
	const [isNavModalOpen, setIsNavModalOpen] = useState(false);
	const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
	const navContainerRef = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setMounted(true);
	}, []);

	const openNavModal = () => {
		document.getElementById("cart-popover")?.hidePopover();
		setIsNavModalOpen(true);
	};

	const closeNavModal = () => {
		setIsNavModalOpen(false);
		hamburgerButtonRef.current?.focus();
	};

	const onCheckoutCallback = () => {
		document.getElementById("cart-popover")?.hidePopover();
		router.push("/checkout");
	};

	useEffect(() => {
		if (!isNavModalOpen) return;

		const mainElement = document.querySelector("main");
		const footerElement = document.querySelector("footer");
		const container = navContainerRef.current;

		if (!container) return;
		if (mainElement) {
			mainElement.setAttribute("inert", "");
			mainElement.setAttribute("aria-hidden", "true");
		}
		if (footerElement) {
			footerElement.setAttribute("inert", "");
			footerElement.setAttribute("aria-hidden", "true");
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
			}
			if (footerElement) {
				footerElement.removeAttribute("inert");
				footerElement.removeAttribute("aria-hidden");
			}
		};
	}, [isNavModalOpen]);

	useLayoutEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
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
				<div className="main-container py-[32px]">
					<div className="flex justify-between md:justify-start lg:justify-between">
						<div className="flex items-center lg:hidden">
							<button
								ref={hamburgerButtonRef}
								className="cursor-pointer md:mr-10.5"
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

						<NavigationLogo menuType="header" />

						<NavigationList
							menuType="header"
							navigationItems={headerNavigationItems}
						/>

						<div className="flex items-center">
							<button
								aria-label="Shopping cart"
								popoverTarget="cart-popover"
								popoverTargetAction="toggle"
								className="relative cursor-pointer"
								aria-controls="cart-popover"
							>
								<CartIcon
									width={23}
									height={20}
									className="fill-current"
									aria-hidden="true"
								/>
								<CartBadge />
							</button>
						</div>
					</div>
				</div>

				{mounted && !disableCartDialog && (
					<CartDialog onCheckout={onCheckoutCallback} />
				)}

				<div className="md:main-container w-full">
					<div className="bg-audiophile-divider h-[1px]" aria-hidden="true" />
				</div>
			</header>

			{mounted &&
				isNavModalOpen &&
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
							<NavigationList
								onNavigate={closeNavModal}
								menuType="content"
								navigationItems={mobileNavigationItems}
							/>
						</div>
					</>,
					document.body
				)}
		</>
	);
}
