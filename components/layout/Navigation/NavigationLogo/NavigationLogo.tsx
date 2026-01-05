import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "@/public/logo.svg";

export default function NavigationLogo({
	showLogo,
	menuType,
}: {
	showLogo: boolean;
	menuType: string;
}) {
	if (!showLogo) {
		return null;
	}

	const logoClasses = cn("flex items-center", {
		"flex-1": menuType === "header",
	});

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
