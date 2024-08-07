import { getIssues } from "./db";
import { Issue } from "./types";

export async function fetchIssues() {
  try {
    const response = await getIssues("SELECT * FROM issue");

    return response as Issue[];
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch issues.");
  }
}
