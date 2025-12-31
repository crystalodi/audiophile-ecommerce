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
	const initializePrices = useProductStore(state => state.initializePrices);

	useEffect(() => {
		if (initialPrices && initialPrices.length > 0) {
			initializePrices(initialPrices);
		}
	}, [initialPrices]);
	return null;
}
