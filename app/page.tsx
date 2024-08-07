import Link from "next/link";
import { submitForm } from "./actions";

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <form
        action={submitForm}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        <textarea
          name="issueDescription"
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
