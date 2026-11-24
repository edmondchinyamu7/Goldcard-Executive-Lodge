import { useNavigate } from 'react-router-dom';
import { CurrencyCode, LODGE_INFO } from '../data/lodgeData';
import { LodgePlaceDetails } from '../hooks/useLodgePlaceData';
import { PageHeader } from '../components/PageHeader';
import { Accommodations } from '../components/Accommodations';

interface AccommodationsPageProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
  placeData: LodgePlaceDetails;
}

const STAY_POLICIES = [
  {
    label: 'Check-in & Check-out',
    value: `Check-in from ${LODGE_INFO.checkInTime} · Check-out by ${LODGE_INFO.checkOutTime}`,
  },
  {
    label: 'Front Desk Reception',
    value: `${LODGE_INFO.frontDeskHours} for late-night arrivals and early departures`,
  },
  {
    label: 'Wi-Fi & Workspaces',
    value: 'Complimentary high-speed Wi-Fi across all suites, study desks, and courtyard',
  },
  {
    label: 'Parking & Security',
    value: 'Private gated on-site parking off Mombo Road included with every stay',
  },
  {
    label: 'Laundry & Garment Care',
    value: 'Same-day laundry and pressing available daily (07:00 – 18:00)',
  },
];

export function AccommodationsPage({
  currency,
  onCurrencyChange,
  selectedRoomId,
  onSelectRoom,
  placeData,
}: AccommodationsPageProps) {
  const navigate = useNavigate();

  const handleSelectAndReserve = (roomId: string) => {
    onSelectRoom(roomId);
    navigate('/reserve');
  };

  return (
    <>
      <PageHeader
        sectionLabel="Accommodations"
        title="Suites and guest rooms designed for calm stays in Blantyre."
        description="Four room tiers tailored for visiting executives, diplomatic travelers, and weekend guests along quiet Mombo Road in Namiwawa."
      />

      <Accommodations
        currency={currency}
        onCurrencyChange={onCurrencyChange}
        selectedRoomId={selectedRoomId}
        onSelectRoom={handleSelectAndReserve}
        placePhotos={placeData.photos}
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-2">
            <p className="text-sm text-[#6E675C]">Stay Policies</p>
            <h2 className="font-serif text-3xl font-medium text-[#171614]">
              Arrival & room standards
            </h2>
          </div>

          <dl className="lg:col-span-8 bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg divide-y divide-[#EFECE6] px-6">
            {STAY_POLICIES.map((policy) => (
              <div
                key={policy.label}
                className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-sm"
              >
                <dt className="font-medium text-[#171614] shrink-0">{policy.label}</dt>
                <dd className="text-[#4A453E] sm:text-right">{policy.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
