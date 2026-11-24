import { Link } from 'react-router-dom';
import { LODGE_INFO } from '../data/lodgeData';

interface FooterProps {
  googleMapsUri: string | null;
  formattedAddress: string | null;
  phoneNumber: string | null;
}

export function Footer({ googleMapsUri, formattedAddress, phoneNumber }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E2DC] bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link to="/" className="font-serif text-xl font-semibold text-[#171614]">
            {LODGE_INFO.name}
          </Link>
          <p className="text-sm text-[#57524A]">
            {formattedAddress || LODGE_INFO.fullAddress} · {phoneNumber || LODGE_INFO.phone}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#57524A]">
          <Link to="/accommodations" className="hover:text-[#171614] transition-colors">
            Accommodations
          </Link>
          <Link to="/gallery" className="hover:text-[#171614] transition-colors">
            Gallery
          </Link>
          <Link to="/dining" className="hover:text-[#171614] transition-colors">
            Dining
          </Link>
          <Link to="/amenities" className="hover:text-[#171614] transition-colors">
            Amenities
          </Link>
          <Link to="/location" className="hover:text-[#171614] transition-colors">
            Location
          </Link>
          <Link to="/reserve" className="hover:text-[#171614] transition-colors">
            Reservations
          </Link>
          <a
            href={googleMapsUri || LODGE_INFO.googleShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#171614] transition-colors"
          >
            Google Maps
          </a>
          <span className="text-[#8A8276] tabular-nums">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
