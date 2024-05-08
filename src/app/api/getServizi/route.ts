import { NextRequest } from "next/server";
import { query } from "../../lib/database";

export async function GET(req: NextRequest) {
	try {
		const result = await query("SELECT * FROM mia_tabella");
		return new Response(JSON.stringify(result.rows), {
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
