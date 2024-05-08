import React, { useEffect, useState } from "react";

interface Service {
	servizio: string;
}

const RecuperaPassword: React.FC = () => {
	const [service, setService] = useState("facebook");
	const [password, setPassword] = useState("");
	const [services, setServices] = useState<Service[]>([]);

	useEffect(() => {
		const fetchServices = async () => {
			const response = await fetch("/api/getServizi");
			const data = await response.json();
			// if (Array.isArray(data)) {
			setServices(data);
			// } else {
			// 	console.error("Invalid data format:", data);
			// }
		};

		fetchServices();
	}, []);

	const fetchPassword = async () => {
		const response = await fetch(`/api/getServizio?servizio=${encodeURIComponent(service)}`);
		const data = await response.json();
		setPassword(data.password);
	};

	return (
		<div>
			<select value={service} onChange={(e) => setService(e.target.value)}>
				{/* Populate this select with options based on your services */}
				{services.map((s) => (
					<option key={s.servizio} value={s.servizio}>
						{s.servizio}
					</option>
				))}
			</select>
			<button onClick={fetchPassword}>Get Password</button>
			{password && <p>Password: {password}</p>}
		</div>
	);
};

export default RecuperaPassword;
