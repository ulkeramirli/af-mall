'use server'

import { redirect } from 'next/navigation'

export async function authenticate(
  prevState: string | null,
  formData: FormData,
): Promise<string | null> {
  // Mock authentication delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Since we have removed backend, just redirect any login to admin
  redirect('/admin')
  
  return null;
}
