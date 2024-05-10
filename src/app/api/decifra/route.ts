import { NextRequest, NextResponse } from "next/server";
import { createDecipheriv } from "crypto";

export async function POST(req: NextRequest, res: NextResponse) {
	if (req.method === "POST") {
		try {
			const body = await req.json();
			const { pass, ivhex } = body;
			const encryptionKey = process.env.ENCRYPTION_KEY;
			if (!encryptionKey) {
				return new Response(JSON.stringify({ error: "Encryption key is missing." }), { status: 500 });
			}

			const iv = Buffer.from(ivhex, "hex");
			const key = Buffer.from(encryptionKey, "hex");
			const decipher = createDecipheriv("aes-256-cbc", key, iv);
			let decrypted = decipher.update(pass, "hex", "utf8");
			decrypted += decipher.final("utf8");
			console.log("questo è descripted: ", decrypted);

			// res.status(200).json({ decryptedPassword: decrypted });
			return new Response(JSON.stringify({ decrypted }), { status: 200 });
		} catch (error) {
			console.error("Decryption error:", error);
			return new Response(JSON.stringify({ error: "Decryption failed" }), { status: 500 });
		}
	} else {
		return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
	}
}
