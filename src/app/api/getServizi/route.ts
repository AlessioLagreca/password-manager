import { NextRequest } from "next/server";
import { query } from "../../lib/database";
// trying to stop the cache from being used
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest) {
	try {
		const result = await query("SELECT * FROM mia_tabella");
		return new Response(JSON.stringify(result.rows), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
			},
		});
	}
}
