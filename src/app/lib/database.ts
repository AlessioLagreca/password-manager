import { Pool } from "pg";

const pool = new Pool({
	user: "alessio",
	host: process.env.DATABASE_HOST,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASS,
	port: 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
