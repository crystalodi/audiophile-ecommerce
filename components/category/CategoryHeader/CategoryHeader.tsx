interface CategoryHeaderProps {
	categoryName: string;
}

export default function CategoryHeader({ categoryName }: CategoryHeaderProps) {
	return (
		<header className="bg-audiophile-black py-[51px] md:pt-[105px] md:pb-[97px] xl:pt-[98px] xl:pb-[97px]">
			<div className="main-container relative justify-center">
				<h1 className="heading-4 md:heading-2 absolute left-1/2 -translate-x-1/2 leading-normal tracking-[2px] text-white">
					{categoryName}
				</h1>
			</div>
		</header>
	);
}
