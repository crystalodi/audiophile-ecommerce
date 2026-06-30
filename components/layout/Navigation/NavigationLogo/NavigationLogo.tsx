import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";

type NavigationLogoProps = {
	menuType: "header" | "footer" | "mobile" | "content";
};

export default function NavigationLogo({ menuType }: NavigationLogoProps) {
	const logoClasses =
		menuType === "header"
			? "flex items-center justify-center md:mr-auto lg:mr-0"
			: "flex items-center justify-center";

	return (
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
	);
}
