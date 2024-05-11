import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
	if (req.method === "POST") {
		try {
			const { id } = await req.json();
			console.log(id);
			return new Response(JSON.stringify({ id }));
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
