import { NextRequest } from "next/server";
import { query } from "../../lib/database";

export async function GET(req: NextRequest) {
	const service = req.nextUrl.searchParams.get("servizio");
	console.log(service);
	try {
		const result = await query("SELECT password FROM mia_tabella WHERE servizio = $1", [service]);
		if (result.rows.length > 0) {
			return new Response(JSON.stringify(result.rows[0]), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		} else {
			return new Response("Service not found", { status: 404 });
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
