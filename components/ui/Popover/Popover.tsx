"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useRef, useState, useEffect } from "react";

interface PopoverProps extends Omit<
	React.ComponentPropsWithoutRef<"div">,
	"id" | "popover"
> {
	/** Classes applied to the backdrop `"div"`**/
	backdropClassName?: string;
	id: string;
	popover: HTMLAttributes<HTMLDivElement>["popover"];
}
/**
 * Requires a trigger element with `popovertarget={id}` in the DOM.
 * @example
 * <button popovertarget="cart-popover">Open</button>
 * <Popover id="cart-popover" popover="auto">...</Popover>
 */
export default function Popover({
	id,
	popover,
	backdropClassName,
	className,
	children,
	...divProps
}: PopoverProps) {
	const internalRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const el = internalRef.current;
		if (!el) return;

		const handleToggle = (event: ToggleEvent) => {
			setIsOpen(event.newState === "open");
		};

		el.addEventListener("toggle", handleToggle as EventListener);
		return () =>
			el.removeEventListener("toggle", handleToggle as EventListener);
	}, []);

	return (
		<>
			{isOpen && (
				<div
					className={cn("fixed inset-0 z-50", backdropClassName)}
					onClick={() => internalRef.current?.hidePopover()}
					aria-hidden="true"
				/>
			)}
			<div
				ref={internalRef}
				id={id}
				popover={popover}
				className={cn("rounded-lg bg-white", className)}
				{...divProps}
			>
				{children}
			</div>
		</>
	);
}
