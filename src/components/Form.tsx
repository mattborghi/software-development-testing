export default function Form(
  props: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
) {
  return (
    <form
      {...props}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <textarea
        name="description"
        placeholder="Ticket description:"
        required
      ></textarea>

      <input type="text" name="name" placeholder="Name" required></input>

      <input type="text" name="email" placeholder="Email" required></input>

      <button type="submit">Submit</button>
    </form>
  );
}
