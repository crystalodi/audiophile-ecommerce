import { getAllProductPrices } from "@/sanity/lib/api";
import PriceInitializerClient from "./PriceInitializerClient";

export default async function PriceInitializer() {
	const initialPrices = await getAllProductPrices();
	return <PriceInitializerClient initialPrices={initialPrices} />;
}
