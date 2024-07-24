import Link from "next/link";

export default function Page() {
  async function submitForm(formData: FormData) {
    "use server";
    const rawFormData = Object.fromEntries(formData);
    console.log({ rawFormData });
  }

  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <form action={submitForm}>
        <div>
          <label htmlFor="issue-description">Issue description:</label>
          <textarea name="issue-description"></textarea>
        </div>

        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name"></input>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" id="email"></input>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
