import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import HeaderWrapper from "@/components/layout/Header";
import { SanityLive } from "@/sanity/lib/live";
import Footer from "@/components/layout/Footer";
import ProductInitializer from "@/components/providers/ProductInitializer";

export const metadata: Metadata = {
	title: "Checkout - Audiophile",
	description: "Complete your audiophile equipment purchase securely",
	robots: "noindex, nofollow",
};

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
});

export default function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={manrope.variable}>
			<body>
				<div className="flex min-h-screen flex-col">
					<ProductInitializer />
					<HeaderWrapper />
					<main>{children}</main>
					<Footer />
					<SanityLive />
				</div>
			</body>
		</html>
	);
}
