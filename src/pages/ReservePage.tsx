import { CurrencyCode } from '../data/lodgeData';
import { LodgePlaceDetails } from '../hooks/useLodgePlaceData';
import { PageHeader } from '../components/PageHeader';
import { ReservationSection } from '../components/ReservationSection';

interface ReservePageProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
  placeData: LodgePlaceDetails;
  mapsAvailable: boolean;
}

export function ReservePage({
  currency,
  onCurrencyChange,
  selectedRoomId,
  onSelectRoom,
  placeData,
  mapsAvailable,
}: ReservePageProps) {
  return (
    <>
      <PageHeader
        sectionLabel="Reservations"
        title="Reserve your stay at Goldcard Executive Lodge."
        description="Select your preferred room tier and travel dates below. Our 24-hour front desk confirms arrivals, corporate stays, and airport pickup requests."
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 flex items-center justify-end">
        <div
          role="group"
          aria-label="Select display currency"
          className="inline-flex items-center p-1 bg-[#F1EDE4] rounded-md border border-[#E5E2DC]"
        >
          {(['USD', 'MWK'] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => onCurrencyChange(code)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                currency === code
                  ? 'bg-[#FFFFFF] text-[#171614] shadow-xs'
                  : 'text-[#57524A] hover:text-[#171614]'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <ReservationSection
        selectedRoomId={selectedRoomId}
        onSelectRoom={onSelectRoom}
        currency={currency}
        placeData={placeData}
        mapsAvailable={mapsAvailable}
      />
    </>
  );
}
