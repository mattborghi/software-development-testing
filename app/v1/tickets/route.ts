import pool from "../../db";
import { Ticket } from "../../../src/types";

export async function POST(request: Request) {
  "use server";
  const formData = await request.formData();
  const ticket = Object.fromEntries(formData) as Omit<Ticket, "id">;
  try {
    const db = await pool.getConnection();
    const query =
      "INSERT INTO tickets (name, email, description) VALUES (?, ?, ?)";
    await db.execute(query, [ticket.name, ticket.email, ticket.description]);
    db.release();
    return Response.json({}, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
