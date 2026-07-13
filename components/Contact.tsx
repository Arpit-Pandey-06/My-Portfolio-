'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Button } from './ui/button';
import { contact } from '@/lib/data';

type ResponseState = { code: number; message: string } | null;

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<ResponseState>(null);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setResponse({ code: 400, message: 'missing required fields' });
      return;
    }
    setResponse({ code: 200, message: 'request accepted — opening mail client...' });
    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    }, 500);
  };

  return (
    <section id="contact" className="px-8 pb-40 pt-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow="api console"
          title="Send a request."
          sub="Fill the payload below — it opens directly in your mail client, addressed and ready."
        />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex items-center gap-2 border-b border-border-soft bg-surface-2 px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-3.5 font-mono text-xs text-text-faint">POST /contact</span>
            </div>

            <div className="p-7">
              <div className="mb-5 font-mono text-[13.5px] text-text-dim">
                <span className="font-semibold text-accent">POST</span> /contact/message HTTP/1.1
              </div>

              <form onSubmit={send} noValidate>
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="contact-name" label="from.name" value={name} onChange={setName} placeholder="Your name" autoComplete="name" />
                  <Field
                    id="contact-email"
                    label="from.email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@email.com"
                    type="email"
                    autoComplete="email"
                  />
                  <Field
                    id="contact-message"
                    label="body.message"
                    value={message}
                    onChange={setMessage}
                    placeholder="What are you building / hiring for?"
                    textarea
                    className="sm:col-span-2"
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <Button type="submit">
                    send request <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                  {response && (
                    <motion.div
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-mono text-[12.5px] text-text-faint"
                    >
                      <span className={response.code === 200 ? 'text-accent' : 'text-amber'}>{response.code}</span>{' '}
                      {response.message}
                    </motion.div>
                  )}
                </div>
              </form>

              <div className="mt-7 flex flex-col border-t border-border-soft">
                <Endpoint verb="GET" path="/contact/email" label={contact.email} href={`mailto:${contact.email}`} icon={<Mail className="h-3.5 w-3.5" />} />
                <Endpoint
                  verb="GET"
                  path="/contact/github"
                  label={contact.githubLabel}
                  href={contact.github}
                  icon={<Github className="h-3.5 w-3.5" />}
                />
                <Endpoint
                  verb="GET"
                  path="/contact/linkedin"
                  label={contact.linkedinLabel}
                  href={contact.linkedin}
                  icon={<Linkedin className="h-3.5 w-3.5" />}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  textarea = false,
  autoComplete,
  className = ''
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="resize-y rounded-lg border border-border bg-bg px-3.5 py-3 font-mono text-[13.5px] text-text outline-none transition-colors focus:border-accent"
        />
      ) : (
        <input
          id={id}
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="rounded-lg border border-border bg-bg px-3.5 py-3 font-mono text-[13.5px] text-text outline-none transition-colors focus:border-accent"
        />
      )}
    </div>
  );
}

function Endpoint({
  verb,
  path,
  label,
  href,
  icon
}: {
  verb: string;
  path: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-3.5 border-b border-border-soft py-3.5 font-mono text-[13px] text-text-dim transition-all hover:pl-2 hover:text-text"
    >
      {icon}
      <span className="w-9 flex-shrink-0 text-blue">{verb}</span>
      {path}
      <span className="text-text-faint">{label}</span>
      <ArrowRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
    </a>
  );
}
