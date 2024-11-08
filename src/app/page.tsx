import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

export const runtime = 'edge';

export default async function Home() {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<SignedIn>
				<Link href="/todos">
					<Button>Todos</Button>
				</Link>
			</SignedIn>
			<SignedOut>
				<Button>
					<SignInButton />
				</Button>
			</SignedOut>
		</div>
	);
}
