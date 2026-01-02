import { getAllProductPrices } from "@/sanity/lib/api";
import ProductInitializerClient from "./ProductInitializerClient";

export default async function ProductInitializer() {
	const initialProducts = await getAllProductPrices();
	return <ProductInitializerClient initialProducts={initialProducts} />;
}
