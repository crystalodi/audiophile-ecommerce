import { imageUrl } from "@/lib/imageUrl";
import { getPreFooterContent } from "@/sanity/lib/api";
import { PortableText } from "next-sanity";
import { PortableTextComponents } from "next-sanity";
import { ReactNode } from "react";
import LogoNavMenuWrapper from "../Navigation";

interface PreFooterProps {
	hideNavigation: boolean;
}

export default async function PreFooter({ hideNavigation }: PreFooterProps) {
	const preFooterData = await getPreFooterContent();

	const portableTextComponents: PortableTextComponents = {
		marks: {
			textColor: ({
				children,
				value,
			}: {
				children: ReactNode;
				value?: {
					value?: {
						hex?: string;
					};
				};
			}) => <span style={{ color: value?.value?.hex }}>{children}</span>,
		},
		block: {
			normal: props => (
				<h2 className="heading-4 md:heading-2 mb-8 max-w-[573px] text-center xl:text-left">
					{props.children}
				</h2>
			),
		},
	};

	return (
		<div className="main-container">
			<section aria-label="Product Categories and Store Information">
				<div className="mb-30 flex flex-col gap-30">
					{!hideNavigation && (
						<div className="flex">
							<LogoNavMenuWrapper menuType="content" />
						</div>
					)}
					{preFooterData && (
						<div className="flex flex-col items-center justify-center gap-10 md:gap-[63px] xl:flex-row-reverse xl:gap-31.25">
							<div className="xl:flex-1">
								<picture>
									<source
										srcSet={imageUrl(preFooterData.image.desktop.asset).url()}
										media="(min-width: 1280px)"
									/>
									<source
										srcSet={imageUrl(preFooterData.image.tablet.asset).url()}
										media="(min-width: 768px)"
									/>
									<img
										src={imageUrl(preFooterData.image.mobile.asset).url()}
										alt="man wearing x99 mark two headphones listening to music"
										className="h-full w-full rounded-lg"
										loading="lazy"
									/>
								</picture>
							</div>
							<div className="flex flex-col items-center xl:flex-1">
								{preFooterData?.title && (
									<PortableText
										value={preFooterData.title}
										components={portableTextComponents}
									/>
								)}
								<p className="body-text text-center text-black/50 xl:text-left">
									{preFooterData.description}
								</p>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
