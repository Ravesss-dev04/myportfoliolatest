"use server";

import nodemailer from "nodemailer";
import { isIP } from "node:net";
import { domainToASCII } from "node:url";
import { contactSchema, readContactForm, validateContact, type ContactState } from "@/lib/contact-schema";

function isValidSmtpHost(host: string): boolean {
  if (/[\/@?#\s]/.test(host)) return false;
  if (isIP(host)) return true;

  const asciiHost = domainToASCII(host.endsWith(".") ? host.slice(0, -1) : host);
  if (!asciiHost || asciiHost.length > 253) return false;

  return asciiHost.split(".").every(
    (label) =>
      label.length > 0 &&
      label.length <= 63 &&
      /^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(label),
  );
}

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never see or fill this field.
  if (formData.get("company")) {
    return { status: "idle", message: "", fieldErrors: {}, submittedAt: 0 };
  }

  const { data, fieldErrors } = validateContact(readContactForm(formData));
  if (!data) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      submittedAt: Date.now(),
    };
  }

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPortValue = process.env.SMTP_PORT;
  const smtpPort = Number(smtpPortValue);
  const smtpUsername = process.env.SMTP_USERNAME?.trim();
  const smtpPassword = process.env.SMTP_PASSWORD;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
  const configurationProblems: string[] = [];

  if (!smtpHost || !isValidSmtpHost(smtpHost)) configurationProblems.push("SMTP_HOST");
  if (!smtpPortValue || !Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
    configurationProblems.push("SMTP_PORT");
  }
  if (!smtpUsername) configurationProblems.push("SMTP_USERNAME");
  if (!smtpPassword) configurationProblems.push("SMTP_PASSWORD");
  if (!recipient || !contactSchema.shape.email.safeParse(recipient).success) {
    configurationProblems.push("CONTACT_RECIPIENT_EMAIL");
  }

  if (configurationProblems.length > 0 || !smtpHost || !smtpUsername || !smtpPassword || !recipient) {
    console.error("[contact] SMTP configuration is incomplete or invalid", configurationProblems);
    return {
      status: "error",
      message: "The contact form is temporarily unavailable. Please try again later.",
      fieldErrors: {},
      submittedAt: Date.now(),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUsername, pass: smtpPassword },
    });

    const result = await transporter.sendMail({
      from: smtpUsername,
      to: recipient,
      replyTo: data.email,
      subject: "Portfolio contact form submission",
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    });

    const recipientAccepted = result.accepted.some(
      (address) => address.toLowerCase() === recipient.toLowerCase(),
    );
    if (!recipientAccepted) {
      console.error("[contact] SMTP server did not accept the configured recipient", {
        rejectedCount: result.rejected.length,
      });
      return {
        status: "error",
        message: "Your message could not be sent. Please try again later.",
        fieldErrors: {},
        submittedAt: Date.now(),
      };
    }
  } catch (error) {
    const details =
      error instanceof Error
        ? {
            code: "code" in error && typeof error.code === "string" ? error.code : "UNKNOWN",
            syscall: "syscall" in error && typeof error.syscall === "string" ? error.syscall : undefined,
            command: "command" in error && typeof error.command === "string" ? error.command : undefined,
            responseCode:
              "responseCode" in error && typeof error.responseCode === "number"
                ? error.responseCode
                : undefined,
          }
        : { code: "UNKNOWN" };
    console.error("[contact] email submission failed", details);
    return {
      status: "error",
      message: "Your message could not be sent. Please try again later.",
      fieldErrors: {},
      submittedAt: Date.now(),
    };
  }

  return {
    status: "success",
    message: "Your message was accepted by the email service. Inbox delivery is not confirmed; I usually reply within two working days.",
    fieldErrors: {},
    submittedAt: Date.now(),
  };
}
