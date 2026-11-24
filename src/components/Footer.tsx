import { LODGE_INFO } from '../data/lodgeData';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E2DC] bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="font-serif text-xl font-semibold text-[#171614]">{LODGE_INFO.name}</div>
          <p className="text-sm text-[#57524A]">
            {LODGE_INFO.fullAddress} · {LODGE_INFO.phone}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[#57524A]">
          <a href="#accommodations" className="hover:text-[#171614] transition-colors">
            Accommodations
          </a>
          <a href="#dining" className="hover:text-[#171614] transition-colors">
            Dining
          </a>
          <a href="#amenities" className="hover:text-[#171614] transition-colors">
            Amenities
          </a>
          <a
            href={LODGE_INFO.googleShareUrl}
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
