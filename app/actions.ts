"use server";

import pool from "./db";

export async function fetchTickets() {
  "use server";
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM tickets";
    const [tickets] = await db.query(query);
    db.release();
    return Response.json({ data: tickets }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
