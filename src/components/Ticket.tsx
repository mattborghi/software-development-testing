"use client";

import { LiHTMLAttributes } from "react";
import { Ticket } from "../types";
import { CIcon } from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";

type Props = LiHTMLAttributes<HTMLLIElement> & { data: Ticket };

const liStyle = {
  display: "flex",
  gap: "1rem",
};

const iconWrapperStyle = { width: "20px" };

export default function TicketItem({ data }: Props) {
  // TODO: Does not revalidate.
  // Maybe is best to use another tool like swr or @tanstack/query.
  const handleRemove = async () => {
    const response = await fetch(`/v1/tickets/${data.id}`, {
      method: "DELETE",
    });
    console.log("Deleted ticket!", response.ok);
  };

  return (
    <li style={liStyle}>
      Ticket Creator: {data.name}, Email: {data.email}, Description:{" "}
      {data.description}
      <div style={iconWrapperStyle}>
        <CIcon color="red" icon={cilTrash} onClick={handleRemove} />
      </div>
    </li>
  );
}
