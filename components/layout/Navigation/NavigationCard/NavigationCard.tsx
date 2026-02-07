"use client";
import Link from "next/link";
import RightArrowIcon from "@/public/icon-arrow-right.svg";

interface NavigationCardProps {
	title: string;
	href: string;
	image?: string;
	onNavigate?: () => void;
}

export default function NavigationCard({
	title,
	image,
	href,
	onNavigate,
}: NavigationCardProps) {
	return (
		<div className="relative flex flex-col">
			{image && (
				<img
					src={image}
					aria-hidden
					className="absolute top-1/10 left-1/2 w-[147px] -translate-x-1/2 -translate-y-1/10 object-cover lg:top-1/5 lg:w-[178px] lg:-translate-y-1/5"
				/>
			)}
			<div className="flex-1 p-6.5 md:p-6.25 lg:p-10"></div>
			<Link
				className="bg-audiophile-gray group flex h-41.25 justify-center rounded-lg lg:h-51"
				href={href}
				aria-label={`Navigation to ${title} products`}
				onClick={() => onNavigate?.()}
			>
				<div className="flex flex-col items-center justify-end">
					<h3 className="mb-[17px] text-[15px] font-bold tracking-[1.07px] text-black uppercase">
						{title}
					</h3>
					<div className="mb-[22px] flex items-center lg:mb-[30px]">
						<p className="subtitle-text group-hover:text-audiophile-orange mr-[13.32px] text-black/50">
							shop
						</p>
						<RightArrowIcon
							className="fill-audiophile-orange"
							aria-hidden="true"
						/>
					</div>
				</div>
			</Link>
		</div>
	);
}
