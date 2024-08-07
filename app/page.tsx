import Link from "next/link";
import { submitForm } from "./actions";
import "./issues.css";

export default function Page() {
  return (
    <div className="wrapper">
      <h1>Home</h1>
      <Link href="/get">Issues</Link>
      <form action={submitForm}>
        <textarea
          name="description"
          placeholder="Issue description:"
          required
        ></textarea>

        <input type="text" name="name" placeholder="Name" required></input>

        <input type="text" name="email" placeholder="Email" required></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
