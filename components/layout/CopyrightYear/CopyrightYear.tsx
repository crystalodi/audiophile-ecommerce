"use client";

import { useEffect, useState } from "react";

export default function CopyrightYear({
	copyrightText,
}: {
	copyrightText: string;
}) {
	const [currentYear, setCurrentYear] = useState(2024);

	useEffect(() => {
		setCurrentYear(new Date().getFullYear());
	}, []);

	return (
		<p className="text-[15px] leading-[25px] font-bold tracking-normal text-white/50 capitalize md:[grid-area:copyright] lg:col-span-2">
			copyright {currentYear}.&nbsp;{copyrightText}
		</p>
	);
}
