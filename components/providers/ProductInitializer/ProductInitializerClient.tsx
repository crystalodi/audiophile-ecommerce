"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import { ALL_PRODUCT_PRICES_QUERYResult } from "@/sanity.types";

interface ProductInitializerClientProps {
	initialProducts: ALL_PRODUCT_PRICES_QUERYResult;
}
export default function ProductInitializerClient({
	initialProducts,
}: ProductInitializerClientProps) {
	const initializeProducts = useProductStore(state => state.initializeProducts);

	useEffect(() => {
		if (initialProducts && initialProducts.length > 0) {
			initializeProducts(initialProducts);
		}
	}, [initialProducts]);
	return null;
}
