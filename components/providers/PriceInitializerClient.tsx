"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import { ALL_PRODUCT_PRICES_QUERYResult } from "@/sanity.types";

interface PriceInitializerClientProps {
	initialPrices: ALL_PRODUCT_PRICES_QUERYResult;
}
export default function PriceInitializerClient({
	initialPrices,
}: PriceInitializerClientProps) {
	const initializeProducts = useProductStore(state => state.initializeProducts);

	useEffect(() => {
		if (initialPrices && initialPrices.length > 0) {
			initializeProducts(initialPrices);
		}
	}, [initialPrices]);
	return null;
}
