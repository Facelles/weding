import prisma from "../lib/prisma";

export async function getBookings() {
    const bookings = await prisma.rsvp.findMany();
    return bookings;
}