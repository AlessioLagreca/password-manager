"use client";

import { useState } from "react";
import RecuperaPassword from "./_components/RecuperaPassword";

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
		<main className='flex min-h-screen flex-col items-center gap-8 p-24'>
			<h1 className='text-3xl font-bold underline'>Password Manager</h1>
			<RecuperaPassword />
		</main>
	);
}
