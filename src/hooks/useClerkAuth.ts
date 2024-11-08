import { useClerk, useUser, useAuth } from '@clerk/clerk-react';

const useClerkAuth = () => {
	const clerk = useClerk();
	const { user } = useUser();
	const { signOut } = useAuth();

	return {
		user,
		signOut,
		signIn: () => clerk.openSignIn(),
	};
};

export default useClerkAuth;
