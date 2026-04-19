"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCheckoutState() {
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
						back to home
					</Link>
				</div>
			</div>
		</div>
	);
}
