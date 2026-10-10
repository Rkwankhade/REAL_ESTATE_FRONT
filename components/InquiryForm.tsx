"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function InquiryForm({ subject }: { subject: string }) {
  const [e, setE] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const d = new FormData(ev.currentTarget); const er: Record<string, string> = {};
    if (!String(d.get("name") || "").trim()) er.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email") || ""))) er.email = "Enter a valid email address.";
    if (String(d.get("message") || "").trim().length < 10) er.message = "Write at least 10 characters.";
    setE(er); if (!Object.keys(er).length) setDone(true);
  };
  if (done) return (
    <div role="status" className="rounded-md border glass-dark p-6">
      <CheckCircle2 className="text-champagne" />
      <p className="mt-3 font-serif text-2xl">Form checked. Nothing was sent.</p>
      <p className="mt-2 text-sm text-ivory/75">This demo has no backend, so your enquiry about {subject} was not delivered to anyone.</p>
      <button className="btn-line mt-4" onClick={() => setDone(false)}>Edit enquiry</button>
    </div>
  );
  const inp = "mt-1 min-h-[44px] w-full rounded-sm border border-white/30 bg-white/10 px-3 text-sm text-ivory [color-scheme:dark]";
  const F = ({ id, t, err, children }: { id: string; t: string; err?: string; children: React.ReactNode }) => (
    <div><label htmlFor={id} className="text-sm font-medium">{t}</label>{children}{err && <p id={`${id}-e`} className="mt-1 text-sm text-red-300">{err}</p>}</div>
  );
  return (
    <form noValidate onSubmit={submit} className="grid gap-4" aria-label={`Enquire about ${subject}`}>
      <F id="name" t="Full name" err={e.name}><input id="name" name="name" autoComplete="name" className={inp} aria-invalid={!!e.name} aria-describedby={e.name ? "name-e" : undefined} /></F>
      <F id="email" t="Email" err={e.email}><input id="email" name="email" type="email" autoComplete="email" className={inp} aria-invalid={!!e.email} aria-describedby={e.email ? "email-e" : undefined} /></F>
      <F id="date" t="Preferred viewing date (optional)"><input id="date" name="date" type="date" className={inp} /></F>
      <F id="message" t="Message" err={e.message}><textarea id="message" name="message" rows={4} className={`${inp} py-2`} aria-invalid={!!e.message} aria-describedby={e.message ? "message-e" : undefined} defaultValue={`I would like to know more about ${subject}.`} /></F>
      <button className="btn-dark" type="submit">Request a Viewing</button>
    </form>
  );
}
