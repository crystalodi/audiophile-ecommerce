import Link from "next/link";

interface ProductPageHeaderProps {
	categoryName: string;
}

export default function ProductPageHeader({
	categoryName,
}: ProductPageHeaderProps) {
	return (
		<nav aria-label="Breadcrumb">
			<Link
				href={`/${categoryName}`}
				className="body-text hover:text-audiophile-orange opacity-50 hover:opacity-100"
			>
				Go Back
			</Link>
		</nav>
	);
}
