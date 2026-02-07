import { cn } from "@/lib/utils";
import Link from "next/link";
import NavigationCard from "@/components/layout/Navigation/NavigationCard";

interface NavigationListProps {
	onNavigate?: () => void;
	menuType: string;
	navigationItems: Array<{
		title: string;
		href: string;
		image?: string;
	}>;
}

export default function NavigationList({
	onNavigate,
	navigationItems,
	menuType,
}: NavigationListProps) {
	const isNavMenuCard = menuType === "content" || menuType === "mobile";
	const menuAriaLabel = `${menuType} navigation menu`;

	const navigationMenuClasses = cn({
		"hidden lg:flex lg:flex-1 lg:items-center": menuType === "header",
		"w-full": menuType === "content" || menuType === "mobile",
	});

	const navigationULClasses = cn("flex list-none gap-4 md:flex-row", {
		"subtitle-text gap-[34px]": menuType === "header",
		"flex-col md:flex-row md:gap-[10px] lg:gap-[30px]":
			menuType === "content" || menuType === "mobile",
		"subtitle-text flex-col items-center md:gap-[34px]": menuType === "footer",
	});

	const listItemClasses = cn({
		"flex-1": menuType === "content" || menuType === "mobile",
		"text-white": menuType === "footer" || menuType === "header",
	});

	return (
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
	);
}
