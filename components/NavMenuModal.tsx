"use client";
import { RefObject } from "react";
import Dialog from "./Dialog";
import LogoNavMenu from "./LogoNavMenu";

type NavMenuModalProps = {
	open: boolean;
	onClose: () => void;
	anchorRef?: RefObject<HTMLElement | null>;
};

function NavMenuModal({ open, onClose, anchorRef }: NavMenuModalProps) {
	console.log(anchorRef);
	return (
		<Dialog
			onClose={onClose}
			modal={false}
			className="w-full rounded-b-lg max-h-[85vh] md:max-h-[initial]"
			open={open}
			anchorRef={anchorRef}
			placement="bottom-left"
			positionStrategy="anchor"
			forceAnchorPositioning={true}
		>
			<div className="flex px-6 py-6 overflow-auto max-h-[85vh] md:max-h-[initial]">
				<LogoNavMenu menuType="mobile" />
			</div>
		</Dialog>
	);
}

export default NavMenuModal;
