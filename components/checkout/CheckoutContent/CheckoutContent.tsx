"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { CartData } from "@/store/cartDataStore";

interface CheckoutContentProps {
	formRef: React.RefObject<HTMLFormElement | null>;
	onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onOrderSuccess: (cartData: CartData, grandTotal: number) => void;
}

export default function CheckoutContent({
	formRef,
	onSubmit,
	onOrderSuccess,
}: CheckoutContentProps) {
	return (
		<div className="flex flex-col gap-y-8 xl:flex-row xl:gap-x-[30px]">
			<section aria-label="Checkout Form" className="xl:flex-1">
				<div className="rounded-lg bg-white pt-6 pr-6 pb-[31px] pl-[23px] md:px-[27px] md:pb-[30px] lg:px-12 lg:pt-13.5 lg:pb-12">
					<h1 className="heading-4 md:heading-3 mb-8">checkout</h1>
					<CheckoutForm ref={formRef} onOrderSuccess={onOrderSuccess} />
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
