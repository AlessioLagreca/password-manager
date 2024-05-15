import React from "react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

function Navbar() {
	const { isLoaded, isSignedIn, user } = useUser();

	return (
		<nav className='flex flex-col px-16 mt-16'>
			<div className='flex justify-between items-baseline gap-8'>
				<h1 className='text-6xl p-4 font-bold underline bg-gradient-to-br from-blue-500 to-green-300 bg-clip-text text-transparent'>
					Password Manager,
				</h1>
				<div className='flex gap-4 align-center text-3xl font-bold bg-gradient-to-br from-blue-500 to-green-300 bg-clip-text text-transparent'>
					<span>Bentornato</span>
					<div className='self-start'>
						{isSignedIn ? (
							<SignedIn>
								{/* Mount the UserButton component */}
								<div className='p-4'>
									<UserButton />
								</div>
							</SignedIn>
						) : (
							<SignedOut>
								<UserButton />
							</SignedOut>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
