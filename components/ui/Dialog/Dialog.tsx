"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface DialogProps extends Omit<
	React.ComponentPropsWithoutRef<"dialog">,
	"open"
> {
	open: boolean;
	onClose: () => void;
	preventClose?: boolean;
}

export default function Dialog({
	open,
	onClose,
	preventClose = false,
	className,
	children,
	...dialogProps
}: DialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) {
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
			console.log("here");
		}
	}, [open]);

	useEffect(() => {
		if (!open) return;
		document.body.classList.add("overflow-hidden");

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [open]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (preventClose) return;
		const rect = dialogRef.current?.getBoundingClientRect();
		if (!rect) return;
		const clickedInside =
			e.clientX >= rect.left &&
			e.clientX <= rect.right &&
			e.clientY >= rect.top &&
			e.clientY <= rect.bottom;
		if (!clickedInside) onClose();
	};

	return (
		<dialog
			ref={dialogRef}
			className={cn(
				"m-auto rounded-lg bg-white outline-none backdrop:bg-black/40",
				className
			)}
			onClick={handleBackdropClick}
			onKeyDown={e => {
				if (e.key === "Escape" && preventClose) {
					e.preventDefault();
				}
			}}
			onCancel={e => {
				if (preventClose) {
					e.preventDefault();
					return;
				}
				onClose();
			}}
			{...dialogProps}
		>
			{children}
		</dialog>
	);
}
