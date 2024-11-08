export const runtime = 'edge';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<title>404: This page could not be found.</title>
			<div>
				<div className="text-center">
					<h1 className="text-4xl font-bold">404</h1>
					<div>
						<h2>This page could not be found.</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
