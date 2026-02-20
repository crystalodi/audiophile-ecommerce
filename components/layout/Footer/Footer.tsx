import { getFooterContent } from "@/sanity/lib/contentApi";
import FacebookIcon from "@/public/icon-facebook.svg";
import InstagramIcon from "@/public/icon-instagram.svg";
import TwitterIcon from "@/public/icon-twitter.svg";
import { cn } from "@/lib/utils";
import NavigationMenu from "@/components/layout/Navigation/NavigationMenu";
import CopyrightYear from "@/components/layout/CopyrightYear";

export default async function Footer() {
	const footerData = await getFooterContent();

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
		<footer className="bg-audiophile-black before:bg-audiophile-orange relative before:absolute before:top-0 before:left-1/2 before:h-[4px] before:w-[101px] before:-translate-x-1/2 before:content-[''] before:md:left-[var(--md-container-margin)] before:md:translate-x-0 before:lg:left-[var(--lg-container-margin)] before:lg:translate-x-0">
			<div className="main-container">
				<div className="pt-13 pb-[38px] md:pt-15 md:pb-[46px] lg:pt-[75px] lg:pb-12">
					<div className="flex flex-col items-center gap-y-12 md:items-start md:gap-y-8 lg:gap-y-9">
						<div className="flex flex-col items-center gap-y-12 md:items-start md:gap-y-8 lg:w-full lg:flex-row lg:justify-between lg:gap-y-0">
							<NavigationMenu menuType="footer" />
						</div>
						<div className="grid w-full grid-cols-1 place-items-center gap-y-12 md:grid-cols-2 md:place-items-start md:gap-y-20 md:[grid-template-areas:'text_text''copyright_social'] lg:grid-cols-2 lg:gap-y-14 lg:[grid-template-areas:'text_social''copyright_copyright']">
							<p className="body-text text-center text-white/50 md:text-left md:[grid-area:text]">
								{footerData?.footerText}
							</p>
							<CopyrightYear
								copyrightText={
									footerData?.copyrightText || "All rights reserved"
								}
							/>
							<div className="flex w-full items-center justify-center gap-4 md:justify-end md:justify-self-end md:[grid-area:social] lg:place-self-end">
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
