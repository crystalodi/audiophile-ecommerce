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
} & React.ComponentPropsWithoutRef<"dialog">;

const BREAKPOINT_MD = 768;
const Z_INDEX = { dialog: 50 };

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
			!isMdScreen
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

		setPosition({ top, left });
	}, [
		anchorRef,
		placement,
		useParentHorizontalPaddingAsOffset,
		positionStrategy,
		isMdScreen,
		memoizedOffset,
	]);

	useLayoutEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const handleClose = () => onClose?.();

		if (open) {
			dialog.showModal(); // Always use showModal - simpler
			dialog.addEventListener("close", handleClose);

			document.body.classList.add("overflow-hidden");

			if (positionStrategy === "anchor" && anchorRef?.current && isMdScreen) {
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
	}, [open, positionStrategy, anchorRef, isMdScreen, updatePosition, onClose]);

	// Position update listeners
	useLayoutEffect(() => {
		if (
			!open ||
			positionStrategy !== "anchor" ||
			!anchorRef?.current ||
			!isMdScreen
		) {
			return;
		}

		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition);

		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition);
		};
	}, [open, anchorRef, isMdScreen, positionStrategy, updatePosition]);

	const shouldUsePositioning = Boolean(
		position &&
			anchorRef?.current &&
			isMdScreen &&
			positionStrategy === "anchor"
	);
	const shouldCenter = !isMdScreen || positionStrategy === "center";

	const dialogClasses = cn(
		"bg-white overflow-hidden",
		{
			"backdrop:bg-black/40": true, // Always use native backdrop
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
		<dialog
			ref={dialogRef}
			className={dialogClasses}
			style={dialogStyle}
			onClick={e => {
				if (e.target === e.currentTarget) {
					onClose?.();
				}
			}}
			{...dialogProps}
		>
			{children}
		</dialog>
	);
};

export default Dialog;
