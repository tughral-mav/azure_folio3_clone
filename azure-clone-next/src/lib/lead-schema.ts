import { z } from 'zod';

/**
 * Shared client+server lead contract.
 * Mirrors the fields captured from the live Elementor Pro / custom AJAX forms
 * (see BLUEPRINT.md §4). The NetSuite `custentity_f3_wpcf_sign` signature and
 * page_journey/UTM attribution are attached server-side only.
 */
export const LeadSchema = z.object({
  fullName: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone').optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  message: z.string().min(5, 'Tell us a little about your project'),
  // attribution (hidden fields on the live site)
  pageUrl: z.string().optional(),
  utm: z.record(z.string()).optional(),
  // bot defenses
  turnstileToken: z.string().optional(), // Cloudflare Turnstile (verified server-side)
  website: z.literal('').optional(),     // honeypot — real users leave it empty
});

export type LeadInput = z.infer<typeof LeadSchema>;
