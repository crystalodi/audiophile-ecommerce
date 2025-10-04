import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "../public/logo.svg";

export default function LogoNavMenu() {
	const logoClasses = cn("flex items-center flex-1");
	const navigationMenuClasses = cn("hidden xl:flex xl:flex-1 xl:items-center");

	return (
		<>
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

			<nav className={navigationMenuClasses} aria-label="Main Menu">
				<ul className="flex list-none text-white subtitle-text gap-[34px]">
					<li>
						<Link href="/" className="hover:text-audiophile-orange">
							Home
						</Link>
					</li>
					<li>
						<Link href="/headphones" className="hover:text-audiophile-orange">
							Headphones
						</Link>
					</li>
					<li>
						<Link href="/speakers" className="hover:text-audiophile-orange">
							Speakers
						</Link>
					</li>
					<li>
						<Link href="/earphones" className="hover:text-audiophile-orange">
							Earphones
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
