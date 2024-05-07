import { NextRequest } from "next/server";
import { query } from "../../lib/database";

export async function POST(req: NextRequest) {
	console.log("Request received", req.method);
	if (req.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	try {
		const data = await req.json();
		const { servizio, password } = data;

		const result = await query("INSERT INTO mia_tabella (servizio, password) VALUES ($1, $2) RETURNING *", [
			servizio,
			password,
		]);

		return new Response(JSON.stringify(result.rows[0]), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
