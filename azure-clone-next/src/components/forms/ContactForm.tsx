'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useId } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LeadSchema, type LeadInput } from '@/lib/lead-schema';

export function ContactForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const uid = useId(); // unique per instance → safe even if the form renders twice on a page
  const fid = (n: string) => `${uid}-${n}`;
  const eid = (n: string) => `${uid}-${n}-err`;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({ resolver: zodResolver(LeadSchema) });

  // capture attribution client-side (replaces the hidden UTM/page_journey fields)
  useEffect(() => {
    setValue('pageUrl', window.location.href);
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    params.forEach((v, k) => k.startsWith('utm_') && (utm[k] = v));
    if (Object.keys(utm).length) setValue('utm', utm);
  }, [setValue]);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function onSubmit(data: LeadInput) {
    setServerError(null);
    // attach Turnstile token if the widget rendered
    const token = (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value;
    const res = await fetch('/api/lead/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, turnstileToken: token }),
    });
    if (res.ok) router.push('/thank-you/');
    else if (res.status === 429) setServerError('Too many attempts. Please wait a moment and try again.');
    else setServerError('Something went wrong. Please try again.');
  }

  const field = 'w-full rounded-md border border-surface-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand';
  const err = 'mt-1 text-xs text-red-600';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fid('fullName')} className="sr-only">Full name (required)</label>
          <input id={fid('fullName')} className={field} placeholder="Full name *" aria-required="true" aria-invalid={errors.fullName ? 'true' : 'false'} aria-describedby={errors.fullName ? eid('fullName') : undefined} {...register('fullName')} />
          {errors.fullName && <p id={eid('fullName')} role="alert" className={err}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor={fid('email')} className="sr-only">Work email (required)</label>
          <input id={fid('email')} type="email" className={field} placeholder="Work email *" aria-required="true" aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? eid('email') : undefined} {...register('email')} />
          {errors.email && <p id={eid('email')} role="alert" className={err}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor={fid('phone')} className="sr-only">Phone</label>
          <input id={fid('phone')} type="tel" className={field} placeholder="Phone" aria-invalid={errors.phone ? 'true' : 'false'} aria-describedby={errors.phone ? eid('phone') : undefined} {...register('phone')} />
          {errors.phone && <p id={eid('phone')} role="alert" className={err}>{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor={fid('company')} className="sr-only">Company</label>
          <input id={fid('company')} className={field} placeholder="Company" {...register('company')} />
        </div>
      </div>
      <div>
        <label htmlFor={fid('message')} className="sr-only">How can we help? (required)</label>
        <textarea id={fid('message')} rows={5} className={field} placeholder="How can we help? *" aria-required="true" aria-invalid={errors.message ? 'true' : 'false'} aria-describedby={errors.message ? eid('message') : undefined} {...register('message')} />
        {errors.message && <p id={eid('message')} role="alert" className={err}>{errors.message.message}</p>}
      </div>

      {/* honeypot — hidden from users, bots fill it → silently rejected */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register('website')} />

      {/* Cloudflare Turnstile — renders only when a site key is configured */}
      {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} />}

      {serverError && <p className={err}>{serverError}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
        {isSubmitting ? 'Sending…' : 'Submit'}
      </button>
      <p className="text-xs text-muted">
        By submitting, you agree to our <Link href="/privacy-policy/" className="underline">privacy policy</Link>.
      </p>
    </form>
  );
}
