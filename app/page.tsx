import Link from "next/link";
import "./page.css";
import { fetchTickets } from "./actions";
import TicketItem from "../src/components/Ticket";
import { Ticket } from "../src/types";

export default async function Page() {
  const response = await fetchTickets();
  const { data } = await response.json();
  const tickets: Ticket[] = data;

  if (response.status === 500) return <div>Failed to load tickets</div>;
  if (!tickets) return <div>Loading...</div>;

  return (
    <div>
      <h1>Tickets</h1>
      <Link href="/create">Create new Ticket</Link>
      <ul role="list">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} data={ticket} />
        ))}
      </ul>
    </div>
  );
}
