import { z } from 'zod';

export const schoolSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  contact: z.string()
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number cannot exceed 15 digits')
    .regex(/^\d+$/, 'Contact number must contain only digits'),
  email_id: z.string().email('Please enter a valid email address'),
  image: z.any().optional()
});