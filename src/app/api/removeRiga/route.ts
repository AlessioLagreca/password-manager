import { query } from "@/app/lib/database";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
	if (req.method === "DELETE") {
		try {
			const body = await req.json();
			const { id } = body;
			console.log(id);
			const result = await query("DELETE FROM mia_tabella WHERE id = $1", [id]);

			return new Response(JSON.stringify({ result }));
		} catch (error) {
			return new Response(JSON.stringify({ error: (error as Error).message }), {
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
	} else {
		return new Response(JSON.stringify({ error: "Metodo non consentito" }), { status: 405 });
	}
}
