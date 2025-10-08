"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "../public/logo.svg";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type LogoNavMenuProps = {
	menuType: "header" | "footer" | "mobile" | "content";
};

type NavigationCardProps = {
	item: {
		title: string;
		href: string;
		image: {
			asset: { url: string };
			alt: string;
		};
	};
};

function NavigationCard({ item }: NavigationCardProps) {
	const img = urlFor(item.image.asset).url();
	return (
		<div className="relative bg-transparent flex flex-col">
			<img
				src={img}
				alt={item.image.alt}
				width={205}
				height={205}
				className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[38%] w-40"
			/>
			<div className="bg-audiophile-gray rounded-lg flex flex-col justify-center items-center h-[165px]"></div>
		</div>
	);
}

export default function LogoNavMenu({ menuType }: LogoNavMenuProps) {
	const [navigationData, setNavigationData] = useState<any>(null);
	const [loading, setLoading] = useState(true);

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
				setLoading(false);
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

	if (loading) {
		return null; // or a loading skeleton
	}

	const showLogo =
		navigationData?.showLogo ??
		(menuType === "header" || menuType === "footer");

	const navigationItems = navigationData?.navigationItems ?? fallbackNavItems;

	const logoClasses = cn("flex items-center flex-1");
	const navigationMenuClasses = cn({
		"hidden xl:flex xl:flex-1 xl:items-center": menuType === "header",
		"w-full": menuType === "content",
	});
	const navigationULClasses = cn("flex list-none", {
		"subtitle-text gap-[34px]": menuType === "header" || menuType === "footer",
		"flex-col gap-[30px] md:flex-row md:gap-[10px] xl:gap-[30px]":
			menuType === "content",
	});

	const menuAriaLabel = `${menuType} navigation menu`;

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
					{navigationItems?.map((item: any, index: number) => (
						<li
							key={`${index}-${menuType}-${item.title}`}
							className={cn({
								"flex-1 mb-4": menuType === "content",
								"text-white": menuType === "footer" || menuType === "header",
							})}
						>
							<Link
								href={item.href}
								className={cn({
									"hover:text-audiophile-orange":
										menuType === "footer" || menuType === "header",
								})}
							>
								{menuType === "content" || menuType === "mobile" ? (
									<NavigationCard item={item} />
								) : (
									item.title
								)}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
