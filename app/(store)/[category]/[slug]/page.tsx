import { getProductDetail } from "@/sanity/lib/productApi";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product/ProductPageClient";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const detailProduct = await getProductDetail(slug);
	if (!detailProduct) return notFound();

	return <ProductPageClient detailProduct={detailProduct} />;
}
