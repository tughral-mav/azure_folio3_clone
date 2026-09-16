'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';

const PLATFORMS = [
  'Azure Synapse',
  'Databricks',
  'Snowflake',
  'On-premise SQL Server / Teradata',
  'Mixed / Not sure',
];

const Schema = z.object({
  fullName: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid work email'),
  company: z.string().min(1, 'Please enter your company'),
  platform: z.string().min(1, 'Please select your current data platform'),
  website: z.literal('').optional(),
});
type Input = z.infer<typeof Schema>;

export function ConsultationForm() {
  const router = useRouter();
  const uid = useId();
  const fid = (n: string) => `${uid}-${n}`;
  const eid = (n: string) => `${uid}-${n}-err`;
  const [serverError, setServerError] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState<string>('');
  const [utm, setUtm] = useState<Record<string, string>>({});
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>({ resolver: zodResolver(Schema) });

  useEffect(() => {
    setPageUrl(window.location.href);
    const params = new URLSearchParams(window.location.search);
    const u: Record<string, string> = {};
    params.forEach((v, k) => k.startsWith('utm_') && (u[k] = v));
    setUtm(u);
  }, []);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function onSubmit(data: Input) {
    setServerError(null);
    const token = (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value;
    const message = `Requesting a free Analytics Modernization Assessment. Current data platform: ${data.platform}.`;
    const res = await fetch('/api/lead/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        company: data.company,
        message,
        pageUrl,
        utm,
        turnstileToken: token,
        website: data.website ?? '',
      }),
    });
    if (res.ok) router.push('/thank-you/');
    else if (res.status === 429) setServerError('Too many attempts. Please wait a moment and try again.');
    else setServerError('Something went wrong. Please try again.');
  }

  const field = 'w-full rounded-md border border-surface-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand';
  const err = 'mt-1 text-xs text-red-600';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
        <label htmlFor={fid('company')} className="sr-only">Company (required)</label>
        <input id={fid('company')} className={field} placeholder="Company *" aria-required="true" aria-invalid={errors.company ? 'true' : 'false'} aria-describedby={errors.company ? eid('company') : undefined} {...register('company')} />
        {errors.company && <p id={eid('company')} role="alert" className={err}>{errors.company.message}</p>}
      </div>
      <div>
        <label htmlFor={fid('platform')} className="mb-1 block text-sm text-ink">
          Current data platform <span aria-hidden>*</span>
        </label>
        <select
          id={fid('platform')}
          className={field}
          defaultValue=""
          aria-required="true"
          aria-invalid={errors.platform ? 'true' : 'false'}
          aria-describedby={errors.platform ? eid('platform') : undefined}
          {...register('platform')}
        >
          <option value="">Select an option</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.platform && <p id={eid('platform')} role="alert" className={err}>{errors.platform.message}</p>}
      </div>

      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register('website')} />
      {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} />}
      {serverError && <p className={err}>{serverError}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto uppercase tracking-wide">
        {isSubmitting ? 'Sending…' : 'Schedule a Free Consultation'}
      </button>
      <p className="text-xs text-muted">
        By submitting, you agree to our <Link href="/privacy-policy/" className="underline">privacy policy</Link>.
      </p>
    </form>
  );
}
