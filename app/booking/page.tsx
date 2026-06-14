import { getBookings } from "../../services/getBooking";

export const dynamic = 'force-dynamic';

export default async function BookingPage() {
  const bookings = await getBookings();
  
  const attending = bookings.filter((b: any) => b.isAttending);
  const notAttending = bookings.filter((b: any) => !b.isAttending);

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-stone-800 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-[#67854C] mb-8 text-center">Статистика відповідей</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Attending */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#E0C590]/50 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#67854C]" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-[#67854C]">Прийдуть</h2>
              <span className="bg-[#67854C] text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
                {attending.length}
              </span>
            </div>
            
            {attending.length === 0 ? (
              <p className="text-stone-400 italic text-center py-6">Поки немає підтверджень</p>
            ) : (
              <ol className="space-y-5 list-decimal pl-5">
                {attending.map((guest: any) => (
                  <li key={guest.id} className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                    <p className="font-medium text-[17px] text-stone-800">{guest.fullName}</p>
                    {guest.wishes && (
                      <p className="text-[14px] text-stone-600 mt-2 bg-stone-50 p-3 rounded-xl border border-stone-100 italic">
                        "{guest.wishes}"
                      </p>
                    )}
                    <p className="text-[11px] text-stone-400 mt-2">
                      {new Date(guest.createdAt).toLocaleString('uk-UA')}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Not Attending */}
          <div className="bg-white/60 rounded-3xl shadow-sm border border-stone-200 p-8 relative overflow-hidden opacity-90">
            <div className="absolute top-0 left-0 w-full h-2 bg-stone-300" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-stone-500">Не зможуть прийти</h2>
              <span className="bg-stone-200 text-stone-600 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
                {notAttending.length}
              </span>
            </div>
            
            {notAttending.length === 0 ? (
              <p className="text-stone-400 italic text-center py-6">Немає відхилених запрошень</p>
            ) : (
              <ol className="space-y-4 list-decimal pl-5">
                {notAttending.map((guest) => (
                  <li key={guest.id} className="border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                    <p className="font-medium text-[16px] text-stone-600">{guest.fullName}</p>
                    {guest.wishes && (
                      <p className="text-[13px] text-stone-500 mt-2 italic">
                        "{guest.wishes}"
                      </p>
                    )}
                    <p className="text-[11px] text-stone-400 mt-2">
                      {new Date(guest.createdAt).toLocaleString('uk-UA')}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
