import React from "react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

function Navbar() {
	const { isLoaded, isSignedIn, user } = useUser();

	return (
		<nav className='items-center hidden w-full ml-auto space-x-8 text-sm md:flex md:text-base md:w-auto '>
			<span className='text-base hover:text-primary hover:cursor-pointer'>FEATURES</span>
			<span className='text-base hover:text-primary hover:cursor-pointer'>PRICING</span>
			<span className='text-base hover:text-primary hover:cursor-pointer'>CONTACT</span>

			{isSignedIn ? (
				<SignedIn>
					{/* Mount the UserButton component */}
					<UserButton />
				</SignedIn>
			) : (
				<SignedOut>
					<UserButton />
				</SignedOut>
			)}
		</nav>
	);
}

export default Navbar;
