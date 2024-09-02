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
  const handleRemove = async () => {
    const result = await fetch(`/v1/tickets/${data.id}`, {
      method: "DELETE",
    });
    if (result.status === 500) console.error(result);
    else console.log("Deleted ticket with id: ", data.id);
  };

  return (
    <li role="listitem" style={liStyle}>
      Ticket Creator: {data.name}, Email: {data.email}, Description:{" "}
      {data.description}
      <div role="button" style={iconWrapperStyle} onClick={handleRemove}>
        <CIcon color="red" icon={cilTrash} />
      </div>
    </li>
  );
}
