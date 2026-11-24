import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LODGE_INFO } from '../data/lodgeData';

const NAV_LINKS = [
  { label: 'Accommodations', to: '/accommodations' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Dining', to: '/dining' },
  { label: 'Location', to: '/location' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleReserveClick = () => {
    setMobileMenuOpen(false);
    navigate('/reserve');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-8">
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#171614] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7B3A] rounded-sm"
        >
          {LODGE_INFO.name}
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7B3A] rounded-sm ${
                  isActive
                    ? 'text-[#171614] underline underline-offset-4 decoration-[#9A7B3A]'
                    : 'text-[#57524A] hover:text-[#171614] hover:underline underline-offset-4 decoration-[#D4CEC3]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleReserveClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7B3A]"
          >
            Reserve a Stay
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#E5E2DC] text-[#171614] hover:bg-[#F2EFE8] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E2DC] bg-[#FAF9F6] px-6 py-4 space-y-2">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 text-base font-medium border-b border-[#EFECE6] last:border-b-0 ${
                  isActive ? 'text-[#9A7B3A]' : 'text-[#171614]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/amenities"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block py-2.5 text-base font-medium border-b border-[#EFECE6] ${
                isActive ? 'text-[#9A7B3A]' : 'text-[#171614]'
              }`
            }
          >
            Amenities
          </NavLink>
          <button
            type="button"
            onClick={handleReserveClick}
            className="w-full mt-2 px-5 py-3 text-sm font-medium bg-[#171614] text-[#FAF9F6] rounded-md text-center cursor-pointer"
          >
            Reserve a Stay
          </button>
        </div>
      )}
    </header>
  );
}
