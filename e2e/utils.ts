import { Ticket } from "../src/types";
import * as crypto from "node:crypto";

export const getData: () => Omit<Ticket, "id"> = () => ({
  name: crypto.randomBytes(20).toString("hex"),
  email: "email@google.com",
  description: "Ticket description",
});
