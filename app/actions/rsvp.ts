'use server'

import prisma from '@/lib/prisma'

export async function submitRsvp(formData: FormData) {
  try {
    const fullName = formData.get('fullName') as String;
    const isAttendingStr = formData.get('isAttending') as String;
    const wishes = formData.get('wishes') as String;

    if (!fullName || !isAttendingStr) {
      return { error: 'Будь ласка, заповніть всі обов`язкові поля' };
    }

    const isAttending = isAttendingStr === 'yes';

    await prisma.rsvp.create({
      data: {
        fullName: String(fullName),
        isAttending,
        wishes: wishes ? String(wishes) : null,
      }
    });

    return { success: true };
  } catch (error) {
    console.error('RSVP submission error:', error);
    return { error: 'Сталася помилка при збереженні. Спробуйте ще раз.' };
  }
}
