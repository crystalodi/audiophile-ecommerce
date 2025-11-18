"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "../public/logo.svg";
import RightArrowIcon from "../public/icon-arrow-right.svg";
import { useEffect, useState } from "react";
import { NAVIGATION_MENU_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type LogoNavMenuProps = {
	menuType: "header" | "footer" | "mobile" | "content";
};

type NavigationCardPropsBase = NonNullable<
	NonNullable<NAVIGATION_MENU_QUERYResult>["navigationItems"]
>[0];

type NavigationCardProps = Partial<NavigationCardPropsBase> & {
	title: string;
	href: string;
};

function NavigationCard({ title, image, href }: NavigationCardProps) {
	return (
		<div className="relative flex flex-col">
			{image && (
				<img
					src={urlFor(image?.asset as unknown as string).url()}
					aria-hidden
					className="w-[147px] object-cover absolute top-1/10 left-1/2 -translate-y-1/10 -translate-x-1/2 xl:w-[178px] xl:top-1/5 xl:-translate-y-1/5"
				/>
			)}
			<div className="flex-1 p-6.5 md:p-6.25 xl:p-10"></div>
			<Link
				className="bg-audiophile-gray rounded-lg flex justify-center h-41.25 xl:h-51 group"
				href={href}
				aria-label={`Navigation to ${title} products`}
			>
				<div className="flex flex-col justify-end items-center">
					<h3 className="text-[15px] text-black tracking-[1.07px] font-bold uppercase mb-[17px]">
						{title}
					</h3>
					<div className="flex items-center mb-[22px] xl:mb-[30px]">
						<p className="subtitle-text text-black/50 mr-[13.32px] group-hover:text-audiophile-orange">
							shop
						</p>
						<RightArrowIcon
							className="fill-audiophile-orange"
							aria-hidden="true"
						/>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default function LogoNavMenu({ menuType }: LogoNavMenuProps) {
	const [navigationData, setNavigationData] =
		useState<NAVIGATION_MENU_QUERYResult>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchNavigation() {
			try {
				const response = await fetch(`/api/navigation/${menuType}`);
				if (response.ok) {
					const data = await response.json();
					setNavigationData(data);
				}
			} catch (error) {
				console.error("Failed to fetch navigation:", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchNavigation();
	}, [menuType]);

	// Fallback navigation items
	const fallbackNavItems = [
		{ title: "Home", href: "/" },
		{ title: "Headphones", href: "/headphones" },
		{ title: "Speakers", href: "/speakers" },
		{ title: "Earphones", href: "/earphones" },
	];

	if (isLoading) {
		return null; // or a loading skeleton
	}

	const showLogo =
		navigationData?.showLogo ??
		(menuType === "header" || menuType === "footer");

	const navigationItems = navigationData?.navigationItems ?? fallbackNavItems;

	const logoClasses = cn("flex items-center", {
		"flex-1": menuType === "header",
	});
	const navigationMenuClasses = cn({
		"hidden xl:flex xl:flex-1 xl:items-center": menuType === "header",
		"w-full": menuType === "content" || menuType === "mobile",
	});
	const navigationULClasses = cn("flex list-none", {
		"subtitle-text gap-[34px]": menuType === "header",
		"flex-col gap-4 md:flex-row md:gap-[10px] xl:gap-[30px]":
			menuType === "content" || menuType === "mobile",
		"subtitle-text flex-col items-center gap-4 md:flex-row md:gap-[34px]":
			menuType === "footer",
	});

	const listItemClasses = cn({
		"flex-1": menuType === "content" || menuType === "mobile",
		"text-white": menuType === "footer" || menuType === "header",
	});

	const menuAriaLabel = `${menuType} navigation menu`;
	const isNavMenuCard = menuType === "content" || menuType === "mobile";

	return (
		<>
			{showLogo && (
				<div className={logoClasses}>
					<Link href="/" aria-label="Audiophile home">
						<Logo
							width={143}
							height={25}
							className="fill-current"
							aria-hidden="true"
						/>
					</Link>
				</div>
			)}

			<nav className={navigationMenuClasses} aria-label={menuAriaLabel}>
				<ul className={navigationULClasses}>
					{navigationItems?.map((item, index: number) => (
						<li
							key={`${index}-${menuType}-${item.title}`}
							className={listItemClasses}
						>
							{isNavMenuCard ? (
								<NavigationCard {...item} />
							) : (
								<Link href={item.href} className="hover:text-audiophile-orange">
									{item.title}
								</Link>
							)}
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
