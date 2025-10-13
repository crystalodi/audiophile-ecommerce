"use client";
import { usePathname } from "next/navigation";
import LogoNavMenu from "./LogoNavMenu";

export default function PreFooter() {
	const pathName = usePathname();
	const isHomePage = pathName === "/";
	return (
		<div className="main-container">
			<section aria-label="Product Categories and Store Information">
				<div className="flex flex-col gap-30 mb-30">
					{!isHomePage && (
						<div className="flex">
							<LogoNavMenu menuType="content" />
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
