"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";

export default function DisableDraftMode() {
	const environment = useDraftModeEnvironment();
	const router = useRouter();

	if (environment !== "live" && environment !== "unknown") {
		return null;
	}

	const handleClick = async () => {
		await fetch("/draft-mode/disable");
		router.refresh();
	};

	return (
		<button
			className="bg-audiophile-gray fixed right-4 bottom-4 z-50 px-4 py-2 capitalize"
			onClick={handleClick}
		>
			Disable draft mode
		</button>
	);
}
