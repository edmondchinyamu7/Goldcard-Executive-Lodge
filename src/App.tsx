import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';
import { CurrencyCode, ROOM_TIERS } from './data/lodgeData';
import { useLodgePlaceData } from './hooks/useLodgePlaceData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AccommodationsPage } from './pages/AccommodationsPage';
import { GalleryPage } from './pages/GalleryPage';
import { DiningPage } from './pages/DiningPage';
import { AmenitiesPage } from './pages/AmenitiesPage';
import { LocationPage } from './pages/LocationPage';
import { ReservePage } from './pages/ReservePage';

const API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) ||
  (globalThis as { GOOGLE_MAPS_API_KEY?: string }).GOOGLE_MAPS_API_KEY ||
  '';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function LodgeRoutes({ mapsAvailable }: { mapsAvailable: boolean }) {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(ROOM_TIERS[0].id);
  const placeData = useLodgePlaceData(mapsAvailable);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                currency={currency}
                onCurrencyChange={setCurrency}
                selectedRoomId={selectedRoomId}
                onSelectRoom={setSelectedRoomId}
                placeData={placeData}
                mapsAvailable={mapsAvailable}
              />
            }
          />
          <Route
            path="/accommodations"
            element={
              <AccommodationsPage
                currency={currency}
                onCurrencyChange={setCurrency}
                selectedRoomId={selectedRoomId}
                onSelectRoom={setSelectedRoomId}
              />
            }
          />
          <Route path="/gallery" element={<GalleryPage placeData={placeData} />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route
            path="/location"
            element={<LocationPage placeData={placeData} mapsAvailable={mapsAvailable} />}
          />
          <Route
            path="/reserve"
            element={
              <ReservePage
                currency={currency}
                onCurrencyChange={setCurrency}
                selectedRoomId={selectedRoomId}
                onSelectRoom={setSelectedRoomId}
                placeData={placeData}
                mapsAvailable={mapsAvailable}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer
        googleMapsUri={placeData.googleMapsUri}
        formattedAddress={placeData.formattedAddress}
        phoneNumber={placeData.nationalPhoneNumber}
      />
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
    <BrowserRouter>
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
            <LodgeRoutes mapsAvailable={true} />
          </APIProvider>
        ) : (
          <LodgeRoutes mapsAvailable={false} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
