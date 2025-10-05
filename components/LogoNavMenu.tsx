"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "../public/logo.svg";
import { useEffect, useState } from "react";

type LogoNavMenuProps = {
	menuType: "header" | "footer" | "mobile" | "content";
};

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

	console.log(showLogo);

	const navigationItems = navigationData?.navigationItems ?? fallbackNavItems;

	const logoClasses = cn("flex items-center flex-1");
	const navigationMenuClasses = cn("hidden xl:flex xl:flex-1 xl:items-center");

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
				<ul className="flex list-none text-white subtitle-text gap-[34px]">
					{navigationItems?.map((item: any, index: number) => (
						<li key={`${index}-${menuType}-${item.title}`}>
							<Link href={item.href} className="hover:text-audiophile-orange">
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
