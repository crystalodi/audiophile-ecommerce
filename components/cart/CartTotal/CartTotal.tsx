"use client";

import { cn } from "@/lib/utils";

interface CartTotalFromCartDialog {
	totalPrice: number;
	variant: "cartDialog";
}

interface CartTotalFromCheckout {
	totalPrice: number;
	variant: "checkout";
	shippingTotal: number;
	vatTotal: number;
	grandTotal: number;
}

type CartTotalProps = CartTotalFromCheckout | CartTotalFromCartDialog;

export default function CartTotal(props: CartTotalProps) {
	const { totalPrice, variant } = props;

	const itemizedLabelClasses = cn("body-text mr-auto text-black/50 uppercase");

	const totalId = `cart-total-${variant}`;
	const shippingId = `shipping-${variant}`;
	const vatId = `vat-${variant}`;
	const grandTotalId = `grand-total-${variant}`;

	return (
		<div
			role="region"
			aria-labelledby={variant === "checkout" ? grandTotalId : totalId}
			aria-label={variant === "cartDialog" ? "Cart total" : "Order summary"}
		>
			<div className="sr-only">
				{variant === "cartDialog"
					? `Cart total: $${totalPrice.toLocaleString("en-US")}`
					: `Order summary: total $${totalPrice.toLocaleString("en-US")}, ` +
						`Shipping $${props.shippingTotal.toLocaleString("en-US")}, ` +
						`VAT $${props.vatTotal.toLocaleString("en-US")}, ` +
						`Grand total $${props.grandTotal.toLocaleString("en-US")}`}
			</div>

			<div className="flex">
				<div className={itemizedLabelClasses} id={totalId}>
					total
				</div>
				<div
					className="font-bold"
					aria-labelledby={totalId}
					aria-describedby={`${totalId}-amount`}
				>
					<span
						id={`${totalId}-amount`}
						aria-label={`${totalPrice.toLocaleString("en-US")} dollars`}
					>
						${totalPrice.toLocaleString("en-US")}
					</span>
				</div>
			</div>

			{variant === "checkout" && (
				<>
					<div className="mt-2 flex">
						<div className={itemizedLabelClasses} id={shippingId}>
							shipping
						</div>
						<div className="font-bold" aria-labelledby={shippingId}>
							<span
								aria-label={`${props.shippingTotal.toLocaleString("en-US")} dollars`}
							>
								${props.shippingTotal.toLocaleString("en-US")}
							</span>
						</div>
					</div>

					<div className="mt-2 flex">
						<div className={itemizedLabelClasses} id={vatId}>
							vat (included)
						</div>
						<div className="font-bold" aria-labelledby={vatId}>
							<span
								aria-label={`${props.vatTotal.toLocaleString("en-US")} dollars VAT included`}
							>
								${props.vatTotal.toLocaleString("en-US")}
							</span>
						</div>
					</div>

					<div className="mt-6 flex">
						<div className={itemizedLabelClasses} id={grandTotalId}>
							grand total
						</div>
						<div
							className="text-audiophile-orange font-bold"
							aria-labelledby={grandTotalId}
							aria-live="polite"
							aria-atomic="true"
						>
							<span
								aria-label={`Grand total ${props.grandTotal.toLocaleString("en-US")} dollars`}
							>
								${props.grandTotal.toLocaleString("en-US")}
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
