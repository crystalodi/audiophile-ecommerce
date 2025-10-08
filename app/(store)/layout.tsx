import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import ToastContainer from "@/components/Toast";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";

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
