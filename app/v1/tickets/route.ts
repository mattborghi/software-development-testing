import { Ticket } from "../../../src/types";
import DB from "../../db";

export async function POST(request: Request) {
  "use server";
  const formData = await request.formData();
  const ticket = Object.fromEntries(formData) as Omit<Ticket, "id">;
  try {
    const db = new DB();
    const query =
      "INSERT INTO tickets (name, email, description) VALUES (?, ?, ?)";
    await db.executeQuery(query, [
      ticket.name,
      ticket.email,
      ticket.description,
    ]);
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

/**
 * Created method just for load testing purposes.
 * The endpoint GET /v1/tickets is reached by SSR.
 * We could, at some point, move the SSR-page to CSR
 * and use this endpoint.
 */
export async function GET() {
  "use server";
  try {
    const db = new DB();
    const query = "SELECT * FROM tickets";
    const tickets = await db.executeQuery(query);
    return Response.json({ data: tickets }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
