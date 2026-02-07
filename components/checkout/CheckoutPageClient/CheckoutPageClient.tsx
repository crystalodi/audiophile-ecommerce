"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import Link from "next/link";
import { useRef } from "react";

export default function CheckoutPageClient() {
	const formRef = useRef<HTMLFormElement>(null);

	const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("about to call form submit handler in CheckoutForm");
		formRef.current?.requestSubmit();
	};

	return (
		<div className="main-container mb-[97px]">
			<div className="mt-4 mb-6">
				<Link href="/" className="body-text opacity-50">
					Go Back
				</Link>
			</div>
			<div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-[30px]">
				<section aria-label="Checkout Form" className="lg:flex-1">
					<div className="rounded-lg bg-white pt-6 pr-6 pb-[31px] pl-[23px] md:px-[27px] md:pb-[30px] lg:px-12 lg:pt-13.5 lg:pb-12">
						<h1 className="heading-4 md:heading-3 mb-8">checkout</h1>
						<CheckoutForm ref={formRef} />
					</div>
				</section>
				<section
					aria-label="Checkout Summary"
					className="lg:w-[350px] lg:flex-shrink-0"
				>
					<div className="rounded-lg bg-white px-6 py-8 md:px-[33px] md:py-8 lg:px-[33px] lg:py-8">
						<h2 className="mb-[31px] text-[18px] font-bold tracking-[1.29px] uppercase">
							summary
						</h2>
						<CheckoutSummary />
						<div className="mt-8">
							<button
								className="btn btn-orange w-full"
								onClick={handleFormSubmit}
							>
								continue & pay
							</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
