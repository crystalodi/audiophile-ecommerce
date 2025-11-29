"use client";
import { useEffect, useState } from "react";
import { useToastStore } from "@/store/toastStore";

type ToastItemProps = {
	id: string;
	message: string;
	type: "success" | "error" | "warning" | "info";
	onRemove: (id: string) => void;
};

const ToastItem = ({ id, message, type, onRemove }: ToastItemProps) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(() => onRemove(id), 3000);
	};

	const getToastStyles = () => {
		const baseStyles =
			"transform transition-all duration-300 ease-in-out p-4 rounded-lg shadow-lg mb-2 flex items-center justify-between min-w-[300px] max-w-[500px]";

		const typeStyles = {
			success: "bg-green-500 text-white",
			error: "bg-red-500 text-white",
			warning: "bg-yellow-500 text-black",
			info: "bg-blue-500 text-white",
		};

		const animationStyles = isVisible
			? "translate-x-0 opacity-100"
			: "translate-x-full opacity-0";

		return `${baseStyles} ${typeStyles[type]} ${animationStyles}`;
	};

	const getIcon = () => {
		const icons = {
			success: "✓",
			error: "✕",
			warning: "⚠",
			info: "ℹ",
		};
		return icons[type];
	};

	return (
		<div className={getToastStyles()}>
			<div className="flex items-center gap-3">
				<span className="text-lg font-bold">{getIcon()}</span>
				<span className="font-medium">{message}</span>
			</div>
			<button
				onClick={handleClose}
				className="ml-4 text-lg transition-opacity hover:opacity-70"
			>
				✕
			</button>
		</div>
	);
};

export default function ToastContainer() {
	const { toasts, removeToast } = useToastStore();

	if (toasts.length === 0) return null;

	return (
		<div className="fixed top-4 right-4 z-50 space-y-2">
			{toasts.map(toast => (
				<ToastItem
					key={toast.id}
					id={toast.id}
					message={toast.message}
					type={toast.type}
					onRemove={removeToast}
				/>
			))}
		</div>
	);
}
