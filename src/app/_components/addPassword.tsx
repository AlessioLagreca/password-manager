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
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const AggiungiPassword: React.FC = () => {
	const [servizio, setServizio] = useState("");
	const [password, setPassword] = useState("");
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
				password,
			}),
		});
		const result = await response.json();
		console.log(result);
		toast.success("Password aggiunta con successo");
	};

	return (
		<>
			<Toaster richColors />
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogTrigger>Aggiungi Password</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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

						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</form>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default AggiungiPassword;
