import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Please enter your name." })
    .max(80, { error: "Name is too long." }),
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Please enter a valid email address." })),
  message: z
    .string()
    .trim()
    .min(20, { error: "A little more detail helps — at least 20 characters." })
    .max(4000, { error: "Message is too long (4,000 characters max)." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: ContactFieldErrors;
  submittedAt: number;
}

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  submittedAt: 0,
};

export function readContactForm(formData: FormData) {
  const read = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return { name: read("name"), email: read("email"), message: read("message") };
}

export function validateContact(raw: Record<ContactField, string>) {
  const result = contactSchema.safeParse(raw);
  if (result.success) return { data: result.data, fieldErrors: {} as ContactFieldErrors };

  const fieldErrors: ContactFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if ((field === "name" || field === "email" || field === "message") && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return { data: null, fieldErrors };
}
