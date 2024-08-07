"use server";

import { createIssue } from "./db";
import { Issue } from "./types";

export async function submitForm(formData: FormData) {
  "use server";
  const issue = Object.fromEntries(formData) as Issue;
  console.log({ issue });
  createIssue(
    "INSERT INTO issue (name, email, description) VALUES (?, ?, ?)",
    issue
  );
}
