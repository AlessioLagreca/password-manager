import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Dialogo from "./dialogo";

interface UserData {
	servizio: string;
	email: string;
	nomeUtente: string;
	password: string;
	ivhex: string;
}

export default function Tabella2() {
	const [userData, setUserData] = useState<UserData[]>([]);
	const [open, setOpen] = useState(false);
	const [passdata, setPassdata] = useState("");

	// CHIAMIAMO I DATI DEL DATABASE (NOME, EMAIL, NOMEUTENTE, PASSWORD) APPENA IL COMPONENTE VIENE MONTATO
	// E LI METTIAMO IN "userData"
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/getServizi");
			const data = await response.json();
			setUserData(data);
		};

		fetchData();
	}, []);

	const decryptPassword = async (pass: string, ivhex: string) => {
		try {
			const response = await fetch("/api/decifra", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ pass, ivhex }),
			});
			const data = await response.json();
			if (response.ok) {
				console.log("Decryption successful:", data);
				setPassdata(data.decrypted);
				setOpen(true);
				return data.decryptedPassword;
			} else {
				throw new Error(data.error || "Failed to decrypt password");
			}
		} catch (error) {
			console.error("Decryption error:", error);
		}
	};

	console.log(userData);

	return (
		<>
			<Dialogo passData={passdata} open={open} setOpen={setOpen} />
			<Card>
				<CardHeader>
					<CardTitle>Il tuo vault</CardTitle>
					<CardDescription>Tutte le tue password, in un unico posto.</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Servzio</TableHead>
								<TableHead>Email</TableHead>
								<TableHead className='hidden md:table-cell'>Nome Utente</TableHead>
								<TableHead className='hidden md:table-cell'>Password</TableHead>
								<TableHead className='hidden md:table-cell'></TableHead>
								<TableHead>
									<span className='sr-only'>Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>

						{/* CORPO DELLA TABELLA */}
						<TableBody>
							{userData.map((user, index) => (
								<TableRow key={index}>
									<TableCell className='font-medium'>{user.servizio}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.nomeUtente}</TableCell>
									<TableCell>{user.password}</TableCell>
									<TableCell className='hidden md:table-cell'>
										<Button onClick={() => decryptPassword(user.password, user.ivhex)}>Decifra</Button>
										{/* <Dialogo onClick={() => decryptPassword(user.password, user.ivhex)} /> */}
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button aria-haspopup='true' size='icon' variant='outline'>
													<MoreHorizontal className='h-4 w-4' />
													<span className='sr-only'>Toggle menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='end'>
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem>Edit</DropdownMenuItem>
												<DropdownMenuItem>Delete</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<div className='text-xs text-muted-foreground'>
						Showing <strong>1-10</strong> of <strong>32</strong> products
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
