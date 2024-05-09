"use client";

import React, { useState } from "react";

const AggiungiPassword: React.FC = () => {
	const [servizio, setServizio] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const response = await fetch("/api/add&cypher/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				servizio,
				password,
			}),
		});
		const result = await response.json();
		console.log(result);
	};

	return (
		<form className='mt-24 flex flex-col gap-4 items-center' onSubmit={handleSubmit}>
			<div>
				<input
					className='w-xl border-[2px] border-slate-800 rounded-md p-2'
					id='servizio'
					type='text'
					placeholder='Servizio'
					value={servizio}
					onChange={(e) => setServizio(e.target.value)}
					required
				/>
			</div>
			<div>
				<input
					className='w-xl border-[2px] border-slate-800 rounded-md p-2'
					id='password'
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<button
				className='w-xl border-[2px] border-slate-800 rounded-md p-2 bg-slate-800 text-white font-medium'
				type='submit'
			>
				Aggiungi Elemento
			</button>
		</form>
	);
};

export default AggiungiPassword;
