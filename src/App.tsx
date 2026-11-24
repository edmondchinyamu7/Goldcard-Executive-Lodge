import { useState } from 'react';
import { CurrencyCode, ROOM_TIERS } from './data/lodgeData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Accommodations } from './components/Accommodations';
import { DiningAndGrounds } from './components/DiningAndGrounds';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';

export function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(ROOM_TIERS[0].id);

  const scrollToReserve = () => {
    const target = document.getElementById('reserve');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#171614]">
      <Navbar onReserveClick={scrollToReserve} />
      <main className="flex-1">
        <Hero onReserveClick={scrollToReserve} />
        <Accommodations
          currency={currency}
          onCurrencyChange={setCurrency}
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
        />
        <DiningAndGrounds />
        <ReservationSection
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
          currency={currency}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
