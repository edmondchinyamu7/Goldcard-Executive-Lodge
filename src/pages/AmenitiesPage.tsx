import { Link } from 'react-router-dom';
import { LODGE_INFO, LODGE_SERVICES } from '../data/lodgeData';
import { PageHeader } from '../components/PageHeader';

const EXECUTIVE_HIGHLIGHTS = [
  {
    index: '05',
    title: 'High-Speed Wi-Fi',
    detail: 'Reliable wireless coverage across every guest room, study desk, lounge, and garden terrace.',
    hours: 'Complimentary',
  },
  {
    index: '06',
    title: 'Airport Transfer Coordination',
    detail: 'Front desk coordination for private transfers to and from Chileka International Airport (BLZ).',
    hours: 'On Request',
  },
  {
    index: '07',
    title: 'Outdoor Swimming Pool',
    detail: 'Shaded garden pool terrace with loungers and towel service for guests.',
    hours: LODGE_INFO.poolHours,
  },
  {
    index: '08',
    title: 'Corporate & Extended Stays',
    detail: 'Dedicated invoicing and quiet long-stay arrangements for NGOs, diplomatic missions, and visiting teams.',
    hours: '24-Hour Desk',
  },
];

export function AmenitiesPage() {
  const allAmenities = [...LODGE_SERVICES, ...EXECUTIVE_HIGHLIGHTS];

  return (
    <>
      <PageHeader
        sectionLabel="Amenities"
        title="Practical hospitality built around executive travel."
        description="Every stay includes 24-hour front desk support, gated compound parking, complimentary Wi-Fi, and access to the garden pool and lounge."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 space-y-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allAmenities.map((item) => (
            <article
              key={item.index}
              className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="text-xs text-[#6E675C] tabular-nums">
                  {item.index} · {item.hours}
                </div>
                <h2 className="font-serif text-2xl font-medium text-[#171614]">{item.title}</h2>
                <p className="text-sm leading-relaxed text-[#4A453E]">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h2 className="font-serif text-2xl font-medium text-[#171614]">
              Need airport pickup or multi-room corporate arrangements?
            </h2>
            <p className="text-sm text-[#4A453E]">
              Include your arrival flight or special requirements in your reservation request, or
              reach our front desk directly at {LODGE_INFO.phone}.
            </p>
          </div>
          <Link
            to="/reserve"
            className="px-6 py-3 text-sm font-medium bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925] rounded-md transition-colors whitespace-nowrap shrink-0 text-center"
          >
            Request a Reservation
          </Link>
        </div>
      </section>
    </>
  );
}
