import { getFooterContent } from "@/sanity/lib/api";
import LogoNavMenu from "./LogoNavMenu";
import FacebookIcon from "../public/icon-facebook.svg";
import InstagramIcon from "../public/icon-instagram.svg";
import TwitterIcon from "../public/icon-twitter.svg";
import { cn } from "@/lib/utils";
export default async function Footer() {
	const footerData = await getFooterContent();
	const currentYear = new Date().getFullYear();

	const getIconComponent = (iconName: string) => {
		const className = cn("[&>path]:fill-current [&>g]:fill-current"); // Target nested elements
		switch (iconName) {
			case "facebook":
				return <FacebookIcon className={className} aria-hidden={true} />;
			case "twitter":
				return <TwitterIcon className={className} aria-hidden={true} />;
			case "instagram":
				return <InstagramIcon className={className} aria-hidden={true} />;
			default:
				return null;
		}
	};

	return (
		<footer className="bg-audiophile-black relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[101px] before:h-[4px] before:bg-audiophile-orange before:md:left-0 before:md:translate-x-[39px] before:xl:translate-x-[165px]">
			<div className="main-container">
				<div className="pb-[38px] pt-13 md:pt-15 md:pb-[46px] xl:pt-[75px] xl:pb-12">
					<div className="flex flex-col gap-y-12 md:gap-y-8 xl:gap-y-9 items-center md:items-start">
						<div className="flex flex-col items-center gap-y-12 md:gap-y-8 xl:gap-y-0 md:items-start xl:flex-row xl:justify-between xl:w-full">
							<LogoNavMenu menuType="footer" />
						</div>
						<div className="grid grid-cols-1 place-items-center gap-y-12 w-full md:gap-y-20 xl:gap-y-14 md:grid-cols-2 md:[grid-template-areas:'text_text''copyright_social'] md:place-items-start xl:grid-cols-2 xl:[grid-template-areas:'text_social''copyright_copyright']">
							<p className="text-white/50 text-center body-text md:text-left md:[grid-area:text]">
								{footerData?.footerText}
							</p>
							<p className="text-white/50 capitalize text-[15px] font-bold tracking-normal leading-[25px] md:[grid-area:copyright] xl:col-span-2">
								copyright {currentYear}.&nbsp;{footerData?.copyrightText}
							</p>
							<div className="flex justify-center items-center gap-4 w-full md:[grid-area:social] md:justify-end md:justify-self-end xl:place-self-end">
								{footerData?.socialMediaLinks.map((link, index) => (
									<a
										target="_blank"
										href={link.url}
										rel="noopener noreferrer"
										key={link.platform}
										aria-label={`Visit our ${link.platform} page`}
										className="text-white hover:text-audiophile-orange transition-colors duration-200"
									>
										{getIconComponent(link.icon)}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
