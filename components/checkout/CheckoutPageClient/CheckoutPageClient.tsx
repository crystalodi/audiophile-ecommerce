"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import Link from "next/link";
import { useRef } from "react";

export default function CheckoutPageClient() {
	const formRef = useRef<HTMLFormElement>({} as HTMLFormElement);

	return (
		<div className="main-container mb-[97px]">
			<div className="mt-4 flex flex-col">
				<div className="mb-6">
					<Link href="/" className="body-text opacity-50">
						Go Back
					</Link>
				</div>
				<section aria-label="Checkout Form">
					<div className="rounded-lg bg-white pt-6 pr-6 pb-[31px] pl-[23px]">
						<CheckoutForm ref={formRef} />
					</div>
				</section>
			</div>
		</div>
	);
}
