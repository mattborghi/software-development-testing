"use server";

import DB from "./db";

export async function fetchTickets() {
  "use server";
  try {
    const db = new DB();
    const query = "SELECT * FROM tickets";
    const tickets = await db.executeQuery(query);
    return Response.json({ data: tickets }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
