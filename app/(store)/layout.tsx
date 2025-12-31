import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import { SanityLive } from "@/sanity/lib/live";
import ToastContainer from "@/components/ui/Toast";
import Footer from "@/components/layout/Footer";
import PreFooter from "@/components/layout/PreFooter";
import PriceInitializer from "@/components/providers/PriceInitializer";

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
				<PriceInitializer />
				<Header />
				<main>
					{children}
					<PreFooter />
				</main>
				<Footer />
				<SanityLive />
				<ToastContainer />
			</body>
		</html>
	);
}
