"use server";

export async function submitForm(formData: FormData) {
  "use server";
  const rawFormData = Object.fromEntries(formData);
  console.log({ rawFormData });
}
