import { FormEvent, useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, MapPin, Phone } from 'lucide-react';
import {
  CurrencyCode,
  LODGE_INFO,
  NEARBY_LANDMARKS,
  ROOM_TIERS,
  formatRoomRate,
} from '../data/lodgeData';
import { LodgePlaceDetails } from '../hooks/useLodgePlaceData';
import { LodgeMap } from './LodgeMap';

interface ReservationSectionProps {
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
  currency: CurrencyCode;
  placeData: LodgePlaceDetails;
  mapsAvailable: boolean;
}

interface BookingReceipt {
  reference: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  estimatedTotal: string;
}

function addDaysIso(base: Date, days: number): string {
  const copy = new Date(base);
  copy.setDate(copy.getDate() + days);
  return copy.toISOString().split('T')[0];
}

export function ReservationSection({
  selectedRoomId,
  onSelectRoom,
  currency,
  placeData,
  mapsAvailable,
}: ReservationSectionProps) {
  const today = useMemo(() => new Date(), []);
  const [checkIn, setCheckIn] = useState(() => addDaysIso(today, 2));
  const [checkOut, setCheckOut] = useState(() => addDaysIso(today, 4));
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);

  const selectedRoom =
    ROOM_TIERS.find((room) => room.id === selectedRoomId) ?? ROOM_TIERS[0];

  const displayAddress = placeData.formattedAddress || LODGE_INFO.fullAddress;
  const displayPhone = placeData.nationalPhoneNumber || LODGE_INFO.phone;
  const displayMapsUrl = placeData.googleMapsUri || LODGE_INFO.googleShareUrl;

  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const estimatedTotal = useMemo(() => {
    if (nights <= 0) return null;
    if (currency === 'USD') {
      return `$${(selectedRoom.rateUsd * nights).toLocaleString('en-US')}`;
    }
    return `MWK ${(selectedRoom.rateMwk * nights).toLocaleString('en-US')}`;
  }, [currency, nights, selectedRoom]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (nights <= 0) {
      setErrorMessage('Check-out date must be at least one night after check-in.');
      return;
    }

    if (!guestName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailTrimmed = guestEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const phoneDigits = guestPhone.replace(/[^\d+]/g, '');
    if (phoneDigits.length < 7) {
      setErrorMessage('Please provide a reachable phone or WhatsApp number.');
      return;
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setReceipt({
      reference: `GCL-${randomCode}`,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      guests,
      guestName: guestName.trim(),
      guestEmail: emailTrimmed,
      guestPhone: guestPhone.trim(),
      estimatedTotal: estimatedTotal ?? formatRoomRate(selectedRoom, currency),
    });
  };

  return (
    <section id="reserve" className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-[#6E675C]">Location & Direct Reservations</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#171614] text-balance">
              Namiwawa Township, minutes from central Blantyre.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#4A453E]">
              Located off Mombo Road in one of Blantyre’s quietest residential suburbs, with quick
              access to diplomatic offices, hospitals, and the central business district.
            </p>
          </div>

          {mapsAvailable && placeData.location && (
            <LodgeMap
              center={placeData.location}
              placeName={placeData.displayName || LODGE_INFO.name}
              address={displayAddress}
            />
          )}

          <div className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg p-6 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#9A7B3A] mt-0.5 shrink-0" aria-hidden="true" />
              <div className="space-y-1">
                <div className="text-sm font-medium text-[#171614]">Address</div>
                <p className="text-sm text-[#4A453E]">{displayAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4 border-t border-[#EFECE6]">
              <Phone className="w-5 h-5 text-[#9A7B3A] mt-0.5 shrink-0" aria-hidden="true" />
              <div className="space-y-1">
                <div className="text-sm font-medium text-[#171614]">24-Hour Front Desk</div>
                <a
                  href={`tel:${displayPhone.replace(/\s+/g, '')}`}
                  className="text-sm text-[#171614] hover:text-[#9A7B3A] underline underline-offset-4 decoration-[#D4CEC3] tabular-nums"
                >
                  {displayPhone}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFECE6]">
              <a
                href={displayMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-[#171614] text-[#171614] hover:bg-[#171614] hover:text-[#FAF9F6] rounded-md transition-colors duration-150 whitespace-nowrap"
              >
                <span>Open Directions on Google Maps</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="border-t border-[#E5E2DC] pt-6">
            <h3 className="text-sm font-medium text-[#171614] mb-4">Nearby Landmarks</h3>
            <dl className="divide-y divide-[#EFECE6] text-sm">
              {NEARBY_LANDMARKS.map((landmark) => (
                <div key={landmark.name} className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#4A453E]">{landmark.name}</dt>
                  <dd className="text-[#6E675C] tabular-nums shrink-0">{landmark.distance}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg p-6 sm:p-8">
            {receipt ? (
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-[#2E6F40] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="text-xs text-[#6E675C] font-mono tabular-nums">
                      Reference {receipt.reference}
                    </p>
                    <h3 className="font-serif text-3xl font-medium text-[#171614]">
                      Reservation request received
                    </h3>
                    <p className="text-sm text-[#4A453E]">
                      Our 24-hour front desk has logged your stay details for confirmation. For
                      immediate arrival assistance, call{' '}
                      <a
                        href={`tel:${displayPhone.replace(/\s+/g, '')}`}
                        className="font-medium text-[#171614] underline underline-offset-4"
                      >
                        {displayPhone}
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <dl className="border-t border-b border-[#E5E2DC] divide-y divide-[#EFECE6] text-sm">
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#6E675C]">Guest</dt>
                    <dd className="font-medium text-[#171614] text-right">
                      {receipt.guestName} · {receipt.guestEmail}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#6E675C]">Room Tier</dt>
                    <dd className="font-medium text-[#171614]">{receipt.roomName}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#6E675C]">Dates</dt>
                    <dd className="font-medium text-[#171614] tabular-nums">
                      {receipt.checkIn} to {receipt.checkOut} ({receipt.nights}{' '}
                      {receipt.nights === 1 ? 'night' : 'nights'})
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#6E675C]">Guests</dt>
                    <dd className="font-medium text-[#171614] tabular-nums">{receipt.guests}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#6E675C]">Estimated Stay Total</dt>
                    <dd className="font-serif text-xl font-medium text-[#171614] tabular-nums">
                      {receipt.estimatedTotal}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setReceipt(null)}
                    className="px-5 py-2.5 text-sm font-medium bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925] rounded-md transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                  <a
                    href={displayMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171614] hover:text-[#9A7B3A] underline underline-offset-4"
                  >
                    <span>Save Lodge Location</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="space-y-1 border-b border-[#EFECE6] pb-5">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#171614]">
                    Request a Room Reservation
                  </h3>
                  <p className="text-sm text-[#6E675C]">
                    Check-in from {LODGE_INFO.checkInTime} · Check-out by{' '}
                    {LODGE_INFO.checkOutTime}
                  </p>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="px-4 py-3 text-sm bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] rounded-md"
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="room-select"
                      className="block text-sm font-medium text-[#171614] mb-1.5"
                    >
                      Room Category
                    </label>
                    <select
                      id="room-select"
                      value={selectedRoom.id}
                      onChange={(e) => onSelectRoom(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D4CEC3] rounded-md text-[#171614] focus:outline-none focus:ring-2 focus:ring-[#9A7B3A]"
                    >
                      {ROOM_TIERS.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} — {formatRoomRate(room, currency)} / night
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="check-in"
                      className="block text-sm font-medium text-[#171614] mb-1.5"
                    >
                      Check-in Date
                    </label>
                    <input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      min={addDaysIso(today, 0)}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D4CEC3] rounded-md text-[#171614] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#9A7B3A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="check-out"
                      className="block text-sm font-medium text-[#171614] mb-1.5"
                    >
                      Check-out Date
                    </label>
                    <input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D4CEC3] rounded-md text-[#171614] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#9A7B3A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium text-[#171614] mb-1.5"
                    >
                      Guests
                    </label>
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D4CEC3] rounded-md text-[#171614] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#9A7B3A]"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="guest-name"
                      className="block text-sm font-medium text-[#171614] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Chisomo Banda"
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D4CEC3] rounded-md text-[#171614] placeholder:text-[#9C9488] focus:outline-none focus:ring-2 focus:ring-[#9A7B3A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guest-email"
                      className="block text-sm font-medium text-[#171614] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="guest-email"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="name@company.mw"
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D4CEC3] rounded-md text-[#171614] placeholder:text-[#9C9488] focus:outline-none focus:ring-2 focus:ring-[#9A7B3A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guest-phone"
                      className="block text-sm font-medium text-[#171614] mb-1.5"
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id="guest-phone"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+265 88..."
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D4CEC3] rounded-md text-[#171614] placeholder:text-[#9C9488] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#9A7B3A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="special-requests"
                      className="block text-sm font-medium text-[#171614] mb-1.5"
                    >
                      Arrival Time or Special Requests (Optional)
                    </label>
                    <textarea
                      id="special-requests"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Late evening check-in, airport pickup request, or dietary preferences..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D4CEC3] rounded-md text-[#171614] placeholder:text-[#9C9488] focus:outline-none focus:ring-2 focus:ring-[#9A7B3A]"
                    />
                  </div>
                </div>

                <div className="pt-5 border-t border-[#EFECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#6E675C]">
                      {nights > 0
                        ? `Estimated stay (${nights} ${nights === 1 ? 'night' : 'nights'})`
                        : 'Select valid check-in and check-out dates'}
                    </div>
                    <div className="font-serif text-2xl font-medium text-[#171614] tabular-nums">
                      {estimatedTotal ?? '—'}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7B3A]"
                  >
                    Confirm Reservation Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
