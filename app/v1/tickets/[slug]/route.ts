import pool from "../../../db";

export async function DELETE(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const ticketId = params.slug;
  try {
    const db = await pool.getConnection();
    const query = "DELETE FROM tickets WHERE id = ?";
    await db.execute(query, [ticketId]);
    db.release();
    return Response.json({}, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
