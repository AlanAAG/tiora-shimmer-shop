import { z } from 'zod';

export const addressSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(50, "Label must be under 50 characters"),
  full_address: z.string().trim().min(5, "Address must be at least 5 characters").max(300, "Address must be under 300 characters"),
  city: z.string().trim().min(2, "City must be at least 2 characters").max(100, "City must be under 100 characters"),
  state: z.string().trim().min(2, "State must be at least 2 characters").max(100, "State must be under 100 characters"),
  postal_code: z.string().trim().regex(/^[0-9]{6}$/, "Postal code must be 6 digits"),
  country: z.string().trim().min(2, "Country must be at least 2 characters").max(100, "Country must be under 100 characters"),
});

export const profileSchema = z.object({
  full_name: z.string().trim().max(100, "Name must be under 100 characters").nullable(),
  phone_number: z.string().trim().regex(/^(\+91)?[6-9]\d{9}$/, "Invalid Indian phone number").nullable().or(z.literal("").transform(() => null)),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format").nullable().or(z.literal("").transform(() => null)),
  gender: z.enum(["female", "male", "other", "prefer_not_to_say"]).nullable().or(z.literal("").transform(() => null)),
});

export const guestOrderSchema = z.object({
  guestEmail: z.string().trim().email("Invalid email address").max(255),
  guestPhone: z.string().trim().regex(/^(\+91)?[6-9]\d{9}$/, "Invalid phone number"),
  totalAmount: z.number().positive("Amount must be positive"),
});

export type AddressInput = z.infer<typeof addressSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
