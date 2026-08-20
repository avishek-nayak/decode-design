import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Enter a valid email address'),
  company: z.string().trim().optional(),
  projectType: z.string().min(1, 'Pick the closest match'),
  budget: z.string().min(1, 'Pick a range — an estimate is fine'),
  message: z
    .string()
    .trim()
    .min(20, 'A little more detail helps — 20 characters minimum'),
});

export const projectTypes = [
  { value: '', label: 'Select…' },
  { value: 'mvp', label: 'MVP design' },
  { value: 'audit', label: 'UX audit' },
  { value: 'saas', label: 'SaaS product design' },
  { value: 'system', label: 'Design system' },
  { value: 'prototype', label: 'Prototyping & micro-interactions' },
  { value: 'strategy', label: 'Deep UX strategy' },
  { value: 'behavioural', label: 'Behavioural design' },
  { value: 'course', label: 'Course enquiry' },
  { value: 'other', label: 'Something else' },
];

export const budgets = [
  { value: '', label: 'Select…' },
  { value: 'under-1l', label: 'Under ₹1,00,000' },
  { value: '1-3l', label: '₹1,00,000 – ₹3,00,000' },
  { value: '3-6l', label: '₹3,00,000 – ₹6,00,000' },
  { value: '6l-plus', label: '₹6,00,000+' },
  { value: 'retainer', label: 'Monthly retainer' },
  { value: 'unsure', label: 'Not sure yet' },
];

/**
 * Stubbed submission.
 *
 * TODO: point this at a real endpoint — a serverless function that forwards
 * to email (Resend, Postmark) is the least infrastructure for the job.
 * The schema above is deliberately importable server-side so the same
 * validation runs on both ends.
 */
export async function submitEnquiry(values) {
  await new Promise((resolve) => {
    setTimeout(resolve, 700);
  });

  if (import.meta.env.DEV) {
    console.info('[enquiry] stubbed submission', values);
  }

  return { ok: true, id: `enq_${Date.now().toString(36)}` };
}
