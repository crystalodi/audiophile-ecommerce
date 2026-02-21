interface CategoryHeaderProps {
	categoryName: string;
}
export default function CategoryHeader({ categoryName }: CategoryHeaderProps) {
	return (
		<header className="bg-audiophile-black flex justify-center py-8 md:pt-[105px] md:pb-[97px] xl:pt-[98px] xl:pb-[97px]">
			<h1 className="heading-4 md:heading-2 text-white">{categoryName}</h1>
		</header>
	);
}
