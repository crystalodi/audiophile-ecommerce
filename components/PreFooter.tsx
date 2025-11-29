"use client";
import { usePathname } from "next/navigation";
import LogoNavMenu from "./LogoNavMenu";
import { useEffect, useState } from "react";
import { imageUrl } from "@/lib/imageUrl";
import { PRE_FOOTER_CONTENT_QUERYResult } from "@/sanity.types";
import { PortableText } from "next-sanity";
import { PortableTextComponents } from "next-sanity";
import { ReactNode } from "react";

export default function PreFooter() {
	const pathName = usePathname();
	const isHomePage = pathName === "/";
	const [prefooterData, setPreFooterData] =
		useState<PRE_FOOTER_CONTENT_QUERYResult>();

	useEffect(() => {
		async function fetchPreFooterContent() {
			try {
				const response = await fetch("/api/prefooter", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					const data = await response.json();
					setPreFooterData(data);
				} else {
					console.error(
						"Failed to fetch pre-footer content:",
						response.statusText
					);
				}
			} catch (error) {
				console.error("Failed to fetch pre-footer content:", error);
			}
		}

		fetchPreFooterContent();
	}, []);

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
					{!isHomePage && (
						<div className="flex">
							<LogoNavMenu menuType="content" />
						</div>
					)}
					{!!prefooterData && (
						<div className="flex flex-col items-center justify-center gap-10 md:gap-[63px] xl:flex-row-reverse xl:gap-31.25">
							<div className="xl:flex-1">
								<picture>
									<source
										srcSet={imageUrl(prefooterData.image.desktop.asset).url()}
										media="(min-width: 1280px)"
									/>
									<source
										srcSet={imageUrl(prefooterData.image.tablet.asset).url()}
										media="(min-width: 768px)"
									/>
									<img
										src={imageUrl(prefooterData.image.mobile.asset).url()}
										alt="man wearing x99 mark two headphones listening to music"
										className="h-full w-full rounded-lg"
										loading="lazy"
									/>
								</picture>
							</div>
							<div className="flex flex-col items-center xl:flex-1">
								{prefooterData?.title && (
									<PortableText
										value={prefooterData.title}
										components={portableTextComponents}
									/>
								)}
								<p className="body-text text-center text-black/50 xl:text-left">
									{prefooterData.description}
								</p>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
