import { NextRequest } from "next/server";
import { query } from "../../lib/database";
import { NextApiRequest, NextApiResponse } from "next";
// trying to stop the cache from being used
export const fetchCache = "force-no-store";

// export async function GET(req: NextRequest) {
// 	try {
// 		const result = await query("SELECT * FROM mia_tabella");
// 		return new Response(JSON.stringify(result.rows), {
// 			status: 200,
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
// 			},
// 		});
// 	} catch (error) {
// 		return new Response(JSON.stringify({ error: (error as Error).message }), {
// 			status: 500,
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
// 			},
// 		});
// 	}
// }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			const result = await query("SELECT * FROM mia_tabella");
			res.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
			res.status(200).json(result.rows);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	} else {
		// Handle any other HTTP method
		res.setHeader("Allow", "GET");
		res.status(405).end("Method Not Allowed");
	}
}
