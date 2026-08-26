import { z } from 'zod';

export const auditLeadSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(7, 'Enter a valid phone number'),
  businessLink: z.string().trim().min(1, 'Add a link to your product or site'),
  problem: z
    .string()
    .trim()
    .min(1, 'Tell us the problem')
    .max(100, 'Keep it under 100 characters'),
  otherDetails: z.string().trim().optional(),
});

/**
 * Stubbed submission — same shape as src/lib/enquiry.js's submitEnquiry.
 *
 * TODO: point this at a real endpoint once one exists.
 */
export async function submitAuditLead(values) {
  await new Promise((resolve) => {
    setTimeout(resolve, 700);
  });

  if (import.meta.env.DEV) {
    console.info('[audit-lead] stubbed submission', values);
  }

  return { ok: true, id: `lead_${Date.now().toString(36)}` };
}
