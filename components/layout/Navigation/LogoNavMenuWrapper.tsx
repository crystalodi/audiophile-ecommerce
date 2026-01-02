"use client";
import { LogoNavMenuProps } from "@/lib/custom.types";
import LogoNavMenu from "./LogoNavMenu";

export default function LogoNavMenuWrapper({
	menuType,
	onNavigate,
}: LogoNavMenuProps) {
	return <LogoNavMenu menuType={menuType} onNavigate={onNavigate} />;
}
