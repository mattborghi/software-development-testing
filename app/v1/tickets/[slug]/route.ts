import { revalidatePath } from "next/cache";
import DB from "../../../db";

export async function DELETE(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const ticketId = params.slug;
  try {
    const db = new DB();
    const query = "DELETE FROM tickets WHERE id = ?";
    await db.executeQuery(query, [ticketId]);
    revalidatePath("/");
    return Response.json({}, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
