import Link from "next/link";

interface ProductPageHeaderProps {
	categoryName: string;
}

export default function ProductPageHeader({
	categoryName,
}: ProductPageHeaderProps) {
	return (
		<nav aria-label="Breadcrumb">
			<Link href={`/${categoryName}`} className="body-text opacity-50">
				Go Back
			</Link>
		</nav>
	);
}
