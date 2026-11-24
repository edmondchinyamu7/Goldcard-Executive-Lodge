import { useEffect, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { CurrencyCode, ROOM_TIERS } from './data/lodgeData';
import { useLodgePlaceData } from './hooks/useLodgePlaceData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Accommodations } from './components/Accommodations';
import { PlacePhotoGallery } from './components/PlacePhotoGallery';
import { DiningAndGrounds } from './components/DiningAndGrounds';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';

const API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

function LodgeContent({ mapsAvailable }: { mapsAvailable: boolean }) {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(ROOM_TIERS[0].id);
  const placeData = useLodgePlaceData(mapsAvailable);

  const scrollToReserve = () => {
    const target = document.getElementById('reserve');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar onReserveClick={scrollToReserve} />
      <main className="flex-1">
        <Hero onReserveClick={scrollToReserve} placeData={placeData} />
        <Accommodations
          currency={currency}
          onCurrencyChange={setCurrency}
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
          placePhotos={placeData.photos}
        />
        <PlacePhotoGallery
          photos={placeData.photos}
          isLoading={placeData.isLoading}
          googleMapsUri={placeData.googleMapsUri}
        />
        <DiningAndGrounds placePhotos={placeData.photos} />
        <ReservationSection
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
          currency={currency}
          placeData={placeData}
          mapsAvailable={mapsAvailable}
        />
      </main>
      <Footer />
    </>
  );
}

export function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const onQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  const mapsAvailable = Boolean(API_KEY);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#171614]">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {mapsAvailable ? (
        <APIProvider apiKey={API_KEY} libraries={['places', 'marker']}>
          <LodgeContent mapsAvailable={true} />
        </APIProvider>
      ) : (
        <LodgeContent mapsAvailable={false} />
      )}
    </div>
  );
}

export default App;
