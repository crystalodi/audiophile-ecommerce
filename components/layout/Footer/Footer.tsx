import { getFooterContent } from "@/sanity/lib/api";
import LogoNavMenu from "@/components/layout/Navigation/LogoNavMenu";
import FacebookIcon from "@/public/icon-facebook.svg";
import InstagramIcon from "@/public/icon-instagram.svg";
import TwitterIcon from "@/public/icon-twitter.svg";
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
		<footer className="bg-audiophile-black before:bg-audiophile-orange relative before:absolute before:top-0 before:left-1/2 before:h-[4px] before:w-[101px] before:-translate-x-1/2 before:content-[''] before:md:left-0 before:md:translate-x-[39px] before:xl:translate-x-[165px]">
			<div className="main-container">
				<div className="pt-13 pb-[38px] md:pt-15 md:pb-[46px] xl:pt-[75px] xl:pb-12">
					<div className="flex flex-col items-center gap-y-12 md:items-start md:gap-y-8 xl:gap-y-9">
						<div className="flex flex-col items-center gap-y-12 md:items-start md:gap-y-8 xl:w-full xl:flex-row xl:justify-between xl:gap-y-0">
							<LogoNavMenu menuType="footer" />
						</div>
						<div className="grid w-full grid-cols-1 place-items-center gap-y-12 md:grid-cols-2 md:place-items-start md:gap-y-20 md:[grid-template-areas:'text_text''copyright_social'] xl:grid-cols-2 xl:gap-y-14 xl:[grid-template-areas:'text_social''copyright_copyright']">
							<p className="body-text text-center text-white/50 md:text-left md:[grid-area:text]">
								{footerData?.footerText}
							</p>
							<p className="text-[15px] leading-[25px] font-bold tracking-normal text-white/50 capitalize md:[grid-area:copyright] xl:col-span-2">
								copyright {currentYear}.&nbsp;{footerData?.copyrightText}
							</p>
							<div className="flex w-full items-center justify-center gap-4 md:justify-end md:justify-self-end md:[grid-area:social] xl:place-self-end">
								{footerData?.socialMediaLinks.map((link, index) => (
									<a
										target="_blank"
										href={link.url}
										rel="noopener noreferrer"
										key={link.platform}
										aria-label={`Visit our ${link.platform} page`}
										className="hover:text-audiophile-orange text-white transition-colors duration-200"
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
