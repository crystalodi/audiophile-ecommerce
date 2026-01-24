import Link from "next/link";

export default function NotFound() {
	return (
		<section
			className="main-container flex flex-col items-center justify-center px-6 py-24 text-center"
			aria-label="Page Not Found"
		>
			<p className="overline-text text-audiophile-orange mb-4">Signal Lost</p>

			<h1 className="heading-1 mb-6">404</h1>

			<p className="heading-2 mb-6" role="heading" aria-level={2}>
				Page Not Found
			</p>

			<p className="body-text mb-10 max-w-md text-black/50">
				The page you&apos;re looking for has either been moved, deleted, or
				never existed. Let&apos;s get you back to experiencing pure sound.
			</p>

			<div className="flex flex-col items-center sm:flex-row">
				<Link href="/" className="btn btn-orange">
					Go to Homepage
				</Link>
			</div>

			<div className="mt-16 flex items-end justify-center gap-[3px]">
				{[...Array(48)].map((_, i) => {
					const height = Math.sin((i / 48) * Math.PI) * 48 + 6;
					return (
						<div
							key={i}
							className="bg-audiophile-orange-light w-[2px] animate-pulse rounded-full"
							style={{
								height: `${height}px`,
								animationDelay: `${i * 40}ms`,
								animationDuration: "1.5s",
							}}
						/>
					);
				})}
			</div>
		</section>
	);
}
