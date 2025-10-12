"use client";
import { usePathname } from "next/navigation";
import LogoNavMenu from "./LogoNavMenu";

export default function PreFooter() {
	const pathName = usePathname();
	const isHomePage = pathName === "/";
	return (
		<section aria-label="Product Categories and Store Information">
			<div className="main-container">
				{!isHomePage && (
					<div className="flex">
						<LogoNavMenu menuType="content" />
					</div>
				)}
			</div>
		</section>
	);
}
