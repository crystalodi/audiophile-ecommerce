import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import HeaderWrapper from "@/components/layout/Header";
import { SanityLive } from "@/sanity/lib/live";
import ToastContainer from "@/components/ui/Toast";
import Footer from "@/components/layout/Footer";
import ProductInitializer from "@/components/providers/ProductInitializer";
import { PreFooterWrapper, PreFooter } from "@/components/layout/PreFooter";
import CartInitializer from "@/components/providers/CartInitializer";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import DisableDraftMode from "@/components/ui/DisableDraftModeButton";

export const metadata: Metadata = {
	title: "Audiophile",
	description: "Ecommerce App",
};

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={manrope.variable}>
			<body className="bg-app-background overflow-x-hidden">
				{(await draftMode()).isEnabled && (
					<>
						<DisableDraftMode />
						<VisualEditing />
					</>
				)}
				<div className="flex min-h-screen flex-col">
					<CartInitializer />
					<ProductInitializer />
					<HeaderWrapper />
					<main>
						{children}
						<PreFooterWrapper>
							<PreFooter />
						</PreFooterWrapper>
					</main>
					<Footer />
					<SanityLive />
					<ToastContainer />
				</div>
			</body>
		</html>
	);
}
