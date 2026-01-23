import Link from "next/link";

export default function NotFound() {
	return (
		<div className="main-container">
			<div
				className="flex flex-col items-center justify-center text-center"
				role="section"
				aria-label="Page Not Found"
			>
				<h1 className="heading-1 mb-6">Page Not Found</h1>
				<p className="body-text mb-8 max-w-md opacity-50">
					The page you're looking for doesn't exist or has been moved
				</p>
				<Link href="/" className="btn btn-orange">
					Go Home
				</Link>
			</div>
		</div>
	);
}
