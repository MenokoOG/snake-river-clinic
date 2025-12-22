import emailjs from "@emailjs/browser";
import { useId, useState } from "react";
import usePageMeta from "../../seo/usePageMeta";

export default function Contact() {
  usePageMeta({
    title: "Contact | Snake River Adult Medicine",
    description:
      "Contact Snake River Adult Medicine in Clarkston, WA. Send a message and view our location.",
    canonicalPath: "/contact",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  const nameId = useId();
  const emailId = useId();
  const msgId = useId();

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const form = e.target as HTMLFormElement;

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("sent");
      setMessage("Message sent. We will respond as soon as possible.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Message failed to send. Please try again.");
    }
  };

  return (
    <section className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="text-white/80">
          For appointment requests, you can also use the Appointments page.
        </p>

        <form
          onSubmit={send}
          className="space-y-4"
          aria-describedby="contact-status"
        >
          <div className="space-y-1">
            <label htmlFor={nameId} className="text-sm text-white/80">
              Name
            </label>
            <input
              id={nameId}
              name="name"
              required
              autoComplete="name"
              className="input"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor={emailId} className="text-sm text-white/80">
              Email
            </label>
            <input
              id={emailId}
              name="email"
              required
              type="email"
              autoComplete="email"
              className="input"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor={msgId} className="text-sm text-white/80">
              Message
            </label>
            <textarea
              id={msgId}
              name="message"
              required
              className="input"
              placeholder="How can we help?"
              rows={6}
            />
          </div>

          <button
            className="btn-hero"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send"}
          </button>

          <p
            id="contact-status"
            role="status"
            className="text-sm text-white/80"
          >
            {message}
          </p>
        </form>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Location</h2>
        <p className="text-white/80">
          Snake River Adult Medicine, Clarkston, WA
        </p>

        <iframe
          title="Map to Snake River Adult Medicine in Clarkston, WA"
          className="w-full h-96 rounded-xl border border-white/10"
          loading="lazy"
          referrerPolicy="no-referrer"
          src="https://www.google.com/maps?q=Clarkston,WA&output=embed"
        />
      </div>
    </section>
  );
}
