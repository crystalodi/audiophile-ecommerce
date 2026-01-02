"use client";
import { usePathname } from "next/navigation";
import PreFooter from "./PreFooter";

export default function PreFooterWrapper() {
	const pathName = usePathname();
	const homePath = "/";
	const hideNavigation = pathName !== homePath;
	return <PreFooter hideNavigation={hideNavigation} />;
}
