"use client";

import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const AggiungiPassword: React.FC = () => {
	const [servizio, setServizio] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [nomeUtente, setNomeUtente] = useState("");
	const [open, setOpen] = React.useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const response = await fetch("/api/add&cypher/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				servizio,
				email,
				nomeUtente,
				password,
			}),
		});
		setServizio("");
		setPassword("");
		const result = await response.json();
		console.log(result);
		toast.success("Password aggiunta con successo");
	};

	return (
		<>
			<Toaster richColors />

			<div className='rounded-lg border bg-card text-card-foreground shadow-sm items-center justify-center flex flex-1 max-h-40 flex-col p-8 mb-10'>
				<h1 className='text-2xl font-bold mb-4'>Aggiungi Credenziali</h1>
				<AlertDialog open={open} onOpenChange={setOpen}>
					<AlertDialogTrigger className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md py-3 px-6 font-bold'>
						Aggiungi Credenziali
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Aggiungi nuove credenziali:</AlertDialogTitle>
						</AlertDialogHeader>
						<form
							className='mt-4 flex flex-col gap-4 items-center'
							onSubmit={(e: React.FormEvent) => {
								wait().then(() => setOpen(false));
								e.preventDefault();
								handleSubmit(e);
							}}
						>
							<div className='grid w-full max-w-sm items-center gap-1.5'>
								<Label htmlFor='servizio'>Servizio</Label>
								<Input
									type='text'
									id='servizio'
									placeholder='Servizio'
									value={servizio}
									onChange={(e) => setServizio(e.target.value)}
									required
								/>
							</div>
							<div className='grid w-full max-w-sm items-center gap-1.5'>
								<Label htmlFor='email'>Email</Label>
								<Input
									type='email'
									id='email'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='grid w-full max-w-sm items-center gap-1.5'>
								<Label htmlFor='nomeUtente'>Nome Utente</Label>
								<Input
									type='text'
									id='nomeUtente'
									placeholder='Nome Utente'
									value={nomeUtente}
									onChange={(e) => setNomeUtente(e.target.value)}
								/>
							</div>
							<div className='grid w-full max-w-sm items-center gap-1.5'>
								<Label htmlFor='servizio'>Password</Label>
								<Input
									type='password'
									id='password'
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>

							<Button type='submit'>Aggiungi Password</Button>

							{/* <AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Continue</AlertDialogAction>
							</AlertDialogFooter> */}
						</form>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</>
	);
};

export default AggiungiPassword;
