import Link from "next/link";
import { fetchIssues } from "../data";
import "./page.css";

export default async function Page() {
  const issues = await fetchIssues();
  console.log({ issues });

  return (
    <div>
      <h1>Issues</h1>
      <Link href="/">Home</Link>
      <ul>
        {issues &&
          issues.map((issue, index) => (
            <li key={index}>
              Issue Creator: {issue.name}, Email: {issue.email}, Description:{" "}
              {issue.description}
            </li>
          ))}
      </ul>
    </div>
  );
}
