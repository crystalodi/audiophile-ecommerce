import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.svg";
import { urlFor } from "@/sanity/lib/image";
import { LogoNavMenuProps } from "@/lib/custom.types";
import { getNavigationMenu } from "@/sanity/lib/api";
import NavigationCard from "./NavigationCard";

export default async function LogoNavMenu({
	menuType,
	onNavigate,
}: LogoNavMenuProps) {
	const navigationData = await getNavigationMenu(menuType);

	// Fallback navigation items
	const fallbackNavItems = [
		{ title: "Home", href: "/" },
		{ title: "Headphones", href: "/headphones" },
		{ title: "Speakers", href: "/speakers" },
		{ title: "Earphones", href: "/earphones" },
	];

	const showLogo =
		navigationData?.showLogo ??
		(menuType === "header" || menuType === "footer");

	const sanityNavItems =
		navigationData?.navigationItems?.map(navItem => {
			return {
				title: navItem.title,
				href: navItem.href,
				image: navItem.image ? urlFor(navItem?.image?.asset as any).url() : "",
			};
		}) ?? null;

	const navigationItems: Array<{
		title: string;
		href: string;
		image?: string;
	}> = sanityNavItems ?? fallbackNavItems;

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
					{navigationItems?.map(item => (
						<li key={`${menuType}-${item.title}`} className={listItemClasses}>
							{isNavMenuCard ? (
								<NavigationCard
									title={item.title}
									href={item.href}
									image={item.image}
									onNavigate={onNavigate}
								/>
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
