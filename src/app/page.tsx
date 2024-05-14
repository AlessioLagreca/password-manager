"use client";

import Tabella from "./_components/tabella";
import AggiungiPassword from "./_components/addPassword";
import Navbar from "./_components/navbar";
// This is a password manager interface that let the user add new password to a linux server database,
// the user can also edit and delete the passwords from the database.

export default function Home() {
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await fetch("/api/save-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password: event.currentTarget.password.value,
				}),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}

		event.currentTarget.reset();
	};

	return (
		<>
			<Navbar />
			<main className='flex flex-col gap-4 justify-center items-center'>
				<div className='flex flex-col gap-4 max-w-6xl'>
					<h1 className='text-5xl p-4 font-bold my-12 underline bg-gradient-to-br from-blue-500 to-blue-300 text-transparent bg-clip-text'>
						Password Manager
					</h1>
					<Tabella />
				</div>
				<div className='flex flex-col gap-4 mt-36'>
					<h1 className='text-3xl font-bold underline'>Aggiungi Password</h1>
					<AggiungiPassword />
				</div>
			</main>
		</>
	);
}
