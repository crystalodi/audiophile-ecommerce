import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import HeaderWrapper from "@/components/layout/Header";
import { SanityLive } from "@/sanity/lib/live";
import ToastContainer from "@/components/ui/Toast";
import Footer from "@/components/layout/Footer";
import ProductInitializer from "@/components/providers/ProductInitializer";
import { PreFooterWrapper, PreFooter } from "@/components/layout/PreFooter";

export const metadata: Metadata = {
	title: "Audiophile",
	description: "Ecommerce App",
};

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={manrope.variable}>
			<body>
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
			</body>
		</html>
	);
}
