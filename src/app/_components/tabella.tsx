import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface UserData {
	servizio: string;
	email: string;
	nomeUtente: string;
	password: string;
}

export default function Tabella() {
	const [userData, setUserData] = useState<UserData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/getServizi");
			const data = await response.json();
			setUserData(data);
		};

		fetchData();
	}, []);

	console.log(userData);

	return (
		<Table>
			<TableCaption>Elenco dei dati degli utenti.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Servizio</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Nome Utente</TableHead>
					<TableHead>Password</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{userData.map((user, index) => (
					<TableRow key={index}>
						<TableCell>{user.servizio}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.nomeUtente}</TableCell>
						<TableCell>{user.password}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
