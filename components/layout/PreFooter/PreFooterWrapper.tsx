"use client";

import { usePathname } from "next/navigation";

interface PreFooterWrapperProps {
	children: React.ReactNode;
}

export default function PreFooterWrapper({ children }: PreFooterWrapperProps) {
	const pathName = usePathname().toLowerCase();
	const validCategories = ["headphones", "speakers", "earphones"];
	const validRoutes = ["/", "/checkout"];
	const isValidRoute =
		validRoutes.includes(pathName) ||
		validCategories.some(category => pathName.startsWith(`/${category}`));
	if (!isValidRoute) {
		return null;
	}
	return <>{children}</>;
}
