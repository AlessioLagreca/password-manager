import { NextRequest } from "next/server";
import { query } from "../../lib/database";
import { randomBytes, createCipheriv } from "crypto";

export async function POST(req: NextRequest) {
	console.log("Request received", req.method);
	if (req.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	try {
		const data = await req.json();
		const { servizio, password } = data;

		// Configurazione per la crittografia
		// const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
		const encryptionKey = process.env.ENCRYPTION_KEY;
		if (!encryptionKey) {
			throw new Error("ENCRYPTION_KEY is not defined in the environment variables.");
		}
		const key = Buffer.from(encryptionKey, "hex");
		const iv = randomBytes(16); // Vettore di inizializzazione
		const cipher = createCipheriv("aes-256-cbc", key, iv);
		let encrypted = cipher.update(password, "utf8", "hex");
		encrypted += cipher.final("hex");
		const encryptedPassword = iv.toString("hex") + ":" + encrypted;

		const result = await query("INSERT INTO mia_tabella (servizio, password) VALUES ($1, $2) RETURNING *", [
			servizio,
			encryptedPassword,
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
