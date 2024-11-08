'use client';

import useClerkAuth from '@/hooks/useClerkAuth';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Auth() {
	const { user, signOut, signIn } = useClerkAuth();

	const userName = user?.fullName
		? user?.firstName + ' ' + user?.lastName
		: 'U';

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="w-7 h-7 cursor-pointer">
							<AvatarImage src={user?.imageUrl} alt={userName} />
							<AvatarFallback className="bg-slate-400">
								U
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-32">
						<DropdownMenuGroup>
							{user && (
								<DropdownMenuItem>
									<button onClick={() => signOut()}>
										Sign out
									</button>
								</DropdownMenuItem>
							)}
							{!user && (
								<DropdownMenuItem>
									<button onClick={() => signIn()}>
										Sign in
									</button>
								</DropdownMenuItem>
							)}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}

export default Auth;
