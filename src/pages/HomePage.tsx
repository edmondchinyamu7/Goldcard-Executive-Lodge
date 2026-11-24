import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CurrencyCode } from '../data/lodgeData';
import { LodgePlaceDetails } from '../hooks/useLodgePlaceData';
import { Hero } from '../components/Hero';
import { Accommodations } from '../components/Accommodations';
import { PlacePhotoGallery } from '../components/PlacePhotoGallery';
import { DiningAndGrounds } from '../components/DiningAndGrounds';
import { ReservationSection } from '../components/ReservationSection';

interface HomePageProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
  placeData: LodgePlaceDetails;
  mapsAvailable: boolean;
}

export function HomePage({
  currency,
  onCurrencyChange,
  selectedRoomId,
  onSelectRoom,
  placeData,
  mapsAvailable,
}: HomePageProps) {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/reserve');
  };

  const handleSelectRoomFromHome = (roomId: string) => {
    onSelectRoom(roomId);
    navigate('/reserve');
  };

  return (
    <>
      <Hero onReserveClick={handleReserveClick} placeData={placeData} />

      <Accommodations
        currency={currency}
        onCurrencyChange={onCurrencyChange}
        selectedRoomId={selectedRoomId}
        onSelectRoom={handleSelectRoomFromHome}
        placePhotos={placeData.photos}
        headerAction={
          <Link
            to="/accommodations"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171614] hover:text-[#9A7B3A] underline underline-offset-4 decoration-[#D4CEC3] whitespace-nowrap shrink-0"
          >
            <span>View Full Rooms & Policies</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        }
      />

      <PlacePhotoGallery
        photos={placeData.photos}
        isLoading={placeData.isLoading}
        googleMapsUri={placeData.googleMapsUri}
        secondaryAction={
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171614] hover:text-[#9A7B3A] underline underline-offset-4 decoration-[#D4CEC3] whitespace-nowrap shrink-0"
          >
            <span>Open Gallery Page</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        }
      />

      <DiningAndGrounds
        placePhotos={placeData.photos}
        headerAction={
          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="/dining"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171614] hover:text-[#9A7B3A] underline underline-offset-4 decoration-[#D4CEC3] whitespace-nowrap shrink-0"
            >
              <span>Explore Dining Page</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/amenities"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#57524A] hover:text-[#171614] underline underline-offset-4 decoration-[#D4CEC3] whitespace-nowrap shrink-0"
            >
              <span>All Guest Amenities</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        }
      />

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
