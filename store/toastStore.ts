import { create } from "zustand";

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
	id: string;
	message: string;
	type: ToastType;
	duration?: number;
};

type ToastStore = {
	toasts: Toast[];
	addToast: (message: string, type?: ToastType, duration?: number) => void;
	removeToast: (id: string) => void;
	clearToasts: () => void;
};

export const useToastStore = create<ToastStore>((set, get) => ({
	toasts: [],

	addToast: (message: string, type: ToastType = "info", duration = 3000) => {
		const id = crypto.randomUUID();
		const toast: Toast = { id, message, type, duration };

		set(state => ({ toasts: [...state.toasts, toast] }));

		// Auto remove after duration
		if (duration > 0) {
			setTimeout(() => {
				get().removeToast(id);
			}, duration);
		}
	},

	removeToast: (id: string) => {
		set(state => ({ toasts: state.toasts.filter(toast => toast.id !== id) }));
	},

	clearToasts: () => {
		set({ toasts: [] });
	},
}));
