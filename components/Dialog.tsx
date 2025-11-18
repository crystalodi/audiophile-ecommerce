import { cn } from "@/lib/utils";
import React, {
	useLayoutEffect,
	useRef,
	useState,
	useCallback,
	useMemo,
} from "react";

type PositionStrategy = "center" | "anchor";
type Placement = "bottom-right" | "bottom-left" | "top-right" | "top-left";

type DialogProps = {
	anchorRef?: React.RefObject<
		HTMLElement | HTMLButtonElement | HTMLDivElement | null
	>;
	onClose: () => void;
	positionStrategy?: PositionStrategy;
	offset?: { x: number; y: number };
	placement?: Placement;
	useParentHorizontalPaddingAsOffset?: boolean;
	modal?: boolean;
	forceAnchorPositioning?: boolean;
} & React.ComponentPropsWithoutRef<"dialog">;

const BREAKPOINT_MD = 768;
const Z_INDEX = { backdrop: 40, dialog: 50 };

const Dialog: React.FC<DialogProps> = ({
	children,
	anchorRef,
	open,
	onClose,
	className,
	positionStrategy = "center",
	offset = { x: 0, y: 0 },
	placement = "bottom-right",
	useParentHorizontalPaddingAsOffset = false,
	modal = true,
	forceAnchorPositioning = false,
	...dialogProps
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [position, setPosition] = useState<{
		top: number;
		left: number;
	} | null>(null);
	const [isMdScreen, setIsMdScreen] = useState(false);
	const memoizedOffset = useMemo(() => offset, [offset.x, offset.y]);

	useLayoutEffect(() => {
		const updateScreenSize = () =>
			setIsMdScreen(window.innerWidth >= BREAKPOINT_MD);

		updateScreenSize();
		window.addEventListener("resize", updateScreenSize);
		return () => window.removeEventListener("resize", updateScreenSize);
	}, []);

	// Position calculation
	const updatePosition = useCallback(() => {
		if (
			positionStrategy !== "anchor" ||
			!anchorRef?.current ||
			!dialogRef.current ||
			(!isMdScreen && !forceAnchorPositioning)
		)
			return;

		const anchorRect = anchorRef.current.getBoundingClientRect();
		const dialogRect = dialogRef.current.getBoundingClientRect();
		const {
			innerWidth: viewportWidth,
			innerHeight: viewportHeight,
			scrollY,
			scrollX,
		} = window;

		// Calculate horizontal padding offset
		const getHorizontalPadding = () => {
			if (!useParentHorizontalPaddingAsOffset || !anchorRef.current) return 0;

			const computedStyle = getComputedStyle(anchorRef.current);
			if (placement.includes("right")) {
				return parseFloat(computedStyle.paddingRight) || 0;
			}
			if (placement.includes("left")) {
				return parseFloat(computedStyle.paddingLeft) || 0;
			}
			return 0;
		};

		const effectiveOffset = {
			x: memoizedOffset.x + getHorizontalPadding(),
			y: memoizedOffset.y,
		};
		console.log(anchorRect);
		const getInitialPosition = (): { top: number; left: number } => {
			const positions = {
				"bottom-right": {
					top: anchorRect.bottom + scrollY + effectiveOffset.y,
					left:
						anchorRect.right + scrollX - dialogRect.width - effectiveOffset.x,
				},
				"bottom-left": {
					top: anchorRect.bottom + scrollY + effectiveOffset.y,
					left: anchorRect.left + scrollX + effectiveOffset.x,
				},
				"top-right": {
					top: anchorRect.top + scrollY - dialogRect.height - effectiveOffset.y,
					left:
						anchorRect.right + scrollX - dialogRect.width - effectiveOffset.x,
				},
				"top-left": {
					top: anchorRect.top + scrollY - dialogRect.height - effectiveOffset.y,
					left: anchorRect.left + scrollX + effectiveOffset.x,
				},
			};
			return positions[placement];
		};

		let { top, left } = getInitialPosition();

		const getParentPaddingRight = () => {
			if (!anchorRef.current?.parentElement) return 0;
			const computedStyle = getComputedStyle(anchorRef.current.parentElement);
			return parseFloat(computedStyle.paddingRight) || 0;
		};

		const bounds = {
			minLeft: scrollX,
			maxLeft:
				scrollX + viewportWidth - dialogRect.width - getParentPaddingRight(),
			minTop: scrollY,
			maxTop: scrollY + viewportHeight - dialogRect.height,
		};

		left = Math.max(bounds.minLeft, Math.min(left, bounds.maxLeft));
		top = Math.max(bounds.minTop, Math.min(top, bounds.maxTop));
		console.log(top);
		setPosition({ top, left });
	}, [
		anchorRef,
		placement,
		useParentHorizontalPaddingAsOffset,
		positionStrategy,
		isMdScreen,
		memoizedOffset,
		forceAnchorPositioning,
	]);

	useLayoutEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const handleClose = () => onClose?.();

		if (open) {
			modal ? dialog.showModal() : dialog.show();
			dialog.addEventListener("close", handleClose);

			document.body.classList.add("overflow-hidden");

			if (
				positionStrategy === "anchor" &&
				anchorRef?.current &&
				(isMdScreen || forceAnchorPositioning)
			) {
				requestAnimationFrame(updatePosition);
			}
		} else {
			dialog.close();
			setPosition(null);
		}

		return () => {
			dialog.removeEventListener("close", handleClose);
			document.body.classList.remove("overflow-hidden");
		};
	}, [
		open,
		modal,
		positionStrategy,
		anchorRef,
		isMdScreen,
		updatePosition,
		onClose,
		forceAnchorPositioning,
	]);

	// Position update listeners
	useLayoutEffect(() => {
		if (
			!open ||
			positionStrategy !== "anchor" ||
			!anchorRef?.current ||
			(!isMdScreen && !forceAnchorPositioning)
		) {
			return;
		}

		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition);

		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition);
		};
	}, [
		open,
		anchorRef,
		isMdScreen,
		positionStrategy,
		updatePosition,
		forceAnchorPositioning,
	]);

	useLayoutEffect(() => {
		if (!open || modal) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose?.();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, modal, onClose]);

	const getBackdropStyle = useCallback(() => {
		if (positionStrategy !== "anchor" || !anchorRef?.current || !isMdScreen) {
			return {};
		}

		const anchorRect = anchorRef.current.getBoundingClientRect();
		return {
			top: anchorRect.bottom + window.scrollY,
			left: 0,
			right: 0,
			bottom: 0,
		};
	}, [positionStrategy, anchorRef, isMdScreen]);

	const shouldUsePositioning = Boolean(
		position &&
			anchorRef?.current &&
			(isMdScreen || forceAnchorPositioning) &&
			positionStrategy === "anchor"
	);
	const shouldCenter =
		(!isMdScreen && !forceAnchorPositioning) || positionStrategy === "center";
	const showAnchoredBackdrop =
		open && !modal && positionStrategy === "anchor" && isMdScreen;
	const showCenteredBackdrop =
		open && !modal && (positionStrategy === "center" || !isMdScreen);

	const dialogClasses = cn(
		"bg-white",
		{
			"backdrop:bg-black/40": modal,
			absolute: shouldUsePositioning,
			fixed: !shouldUsePositioning,
			"left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2": shouldCenter,
			invisible: positionStrategy === "anchor" && isMdScreen && !position,
		},
		className
	);

	const dialogStyle = shouldUsePositioning
		? {
				top: position!.top,
				left: position!.left,
				margin: 0,
				zIndex: Z_INDEX.dialog,
			}
		: { zIndex: Z_INDEX.dialog };

	return (
		<>
			{showAnchoredBackdrop && (
				<div
					className="fixed bg-black/40"
					style={{ ...getBackdropStyle(), zIndex: Z_INDEX.backdrop }}
					onClick={onClose}
				/>
			)}

			{showCenteredBackdrop && (
				<div
					className="fixed inset-0 bg-black/40"
					style={{ zIndex: Z_INDEX.backdrop }}
					onClick={onClose}
				/>
			)}

			<dialog
				ref={dialogRef}
				className={dialogClasses}
				style={dialogStyle}
				onClick={e => {
					if (modal && e.target === e.currentTarget) {
						onClose?.();
					}
				}}
				{...dialogProps}
			>
				{children}
			</dialog>
		</>
	);
};

export default Dialog;
