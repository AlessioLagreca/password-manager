import React from "react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

function Navbar() {
	const { isLoaded, isSignedIn, user } = useUser();

	return (
		<nav className='flex flex-col px-16 mt-4 mb-12'>
			<div className='flex flex-col justify-start items-baseline gap-2'>
				<h1 className='text-6xl py-4 font-bold underline bg-gradient-to-br from-blue-500 to-green-300 bg-clip-text text-transparent'>
					Password Manager,
				</h1>
				<div className='flex gap-4 align-middle '>
					<div className='flex gap-4 align-baseline'>
						<span className='text-3xl font-bold bg-gradient-to-br from-blue-500 to-green-300 bg-clip-text text-transparent'>
							Bentornato Alessio
						</span>
						<span>👋</span>
					</div>
					<div className='self-start'>
						{isSignedIn ? (
							<SignedIn>
								{/* Mount the UserButton component */}
								<div>
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
