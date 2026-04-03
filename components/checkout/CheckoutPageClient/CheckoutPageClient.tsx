"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { useCartDataStore } from "@/store/cartDataStore";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

function EmptyCheckoutState() {
	return (
		<div className="rounded-lg bg-white p-8 md:p-16">
			<div className="flex min-w-0 flex-1 items-center justify-center p-6 md:p-12">
				<div className="max-w-sm text-center">
					<div className="bg-audiophile-gray mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
						<ShoppingCart className="size-10 text-black/30" />
					</div>
					<h1 className="heading-4 mb-6">Your cart is empty</h1>
					<p className="body-text mb-6 text-balance text-black/50">
						Looks like you haven't added any products to your cart yet. Browse
						our collection to find the perfect audio equipment for you.
					</p>
					<Link href="/" className="btn btn-orange w-[85%]">
						continue shopping
					</Link>
				</div>
			</div>
		</div>
	);
}

function CheckoutContent({
	formRef,
	onSubmit,
}: {
	formRef: React.RefObject<HTMLFormElement | null>;
	onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	return (
		<div className="flex flex-col gap-y-8 xl:flex-row xl:gap-x-[30px]">
			<section aria-label="Checkout Form" className="xl:flex-1">
				<div className="rounded-lg bg-white pt-6 pr-6 pb-[31px] pl-[23px] md:px-[27px] md:pb-[30px] lg:px-12 lg:pt-13.5 lg:pb-12">
					<h1 className="heading-4 md:heading-3 mb-8">checkout</h1>
					<CheckoutForm ref={formRef} />
				</div>
			</section>
			<section
				aria-label="Checkout Summary"
				className="xl:w-[350px] xl:flex-shrink-0"
			>
				<div className="rounded-lg bg-white px-6 py-8 md:px-[33px] md:py-8 lg:px-[33px] lg:py-8">
					<h2 className="mb-[31px] text-[18px] font-bold tracking-[1.29px] uppercase">
						summary
					</h2>
					<CheckoutSummary />
					<div className="mt-8">
						<button className="btn btn-orange w-full" onClick={onSubmit}>
							continue & pay
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}

export default function CheckoutPageClient() {
	const formRef = useRef<HTMLFormElement>(null);
	const totalItems = useCartDataStore(state => state.totalItems);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		formRef.current?.requestSubmit();
	};

	return (
		<div className="main-container mb-[97px]">
			<div className="mt-4 mb-6">
				<Link href="/" className="body-text opacity-50">
					Go Back
				</Link>
			</div>

			{!isHydrated ? null : totalItems === 0 ? (
				<EmptyCheckoutState />
			) : (
				<CheckoutContent formRef={formRef} onSubmit={handleFormSubmit} />
			)}
		</div>
	);
}
