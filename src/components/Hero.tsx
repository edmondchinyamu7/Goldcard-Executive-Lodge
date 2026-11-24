import { ArrowUpRight } from 'lucide-react';
import { LODGE_INFO } from '../data/lodgeData';
import { LodgePlaceDetails } from '../hooks/useLodgePlaceData';
import { SafeImage } from './SafeImage';
import heroLodgeExteriorImg from '../assets/images/hero_lodge_exterior_1795506858491.jpg';

interface HeroProps {
  onReserveClick: () => void;
  placeData: LodgePlaceDetails;
}

export function Hero({ onReserveClick, placeData }: HeroProps) {
  const leadPhoto = placeData.photos[3] ?? placeData.photos[0];
  const heroSrc = leadPhoto?.heroUrl || heroLodgeExteriorImg;

  const propertyMetrics = [
    { figure: '04', label: 'Accommodation Tiers' },
    { figure: '24 hrs', label: 'Front Desk & Security' },
    placeData.rating !== null
      ? {
          figure: `${placeData.rating.toFixed(1)} / 5`,
          label: placeData.userRatingCount
            ? `Google Rating (${placeData.userRatingCount} reviews)`
            : 'Google Maps Rating',
        }
      : { figure: '3.5 km', label: 'North of Blantyre CBD' },
    { figure: 'Pool & Dining', label: 'Private Garden Grounds' },
  ];

  return (
    <section id="top" className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-14 pb-12">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="lg:col-span-5 flex flex-col justify-between py-2 gap-8">
          <div className="space-y-5">
            <p className="text-sm text-[#6E675C] tracking-wide">
              {placeData.formattedAddress || LODGE_INFO.shortLocation}
            </p>
            <h1 className="font-serif text-[clamp(2.4rem,4vw,3.65rem)] leading-[1.08] font-medium tracking-tight text-[#171614] text-balance">
              A quiet executive sanctuary in Namiwawa.
            </h1>
            <p className="text-base leading-relaxed text-[#4A453E] max-w-md">
              Set along shaded Mombo Road moments from Blantyre’s commercial and diplomatic quarter,
              Goldcard Executive Lodge brings together tranquil garden suites, poolside dining, and
              attentive 24-hour hospitality.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={onReserveClick}
              className="px-6 py-3 text-sm font-medium bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7B3A]"
            >
              Reserve Your Room
            </button>
            <a
              href={placeData.googleMapsUri || LODGE_INFO.googleShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171614] hover:text-[#8A6A28] underline underline-offset-4 decoration-[#D4CEC3] hover:decoration-[#9A7B3A] transition-colors whitespace-nowrap shrink-0 py-2"
            >
              <span>View Google Maps Listing</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-2">
          <div className="flex-1 min-h-[300px] lg:min-h-[470px] rounded-lg overflow-hidden border border-[#E5E2DC] bg-[#EDE9E0]">
            <SafeImage
              src={heroSrc}
              alt="Goldcard Executive Lodge in Namiwawa, Blantyre"
              fallbackLabel="Goldcard Executive Lodge"
              className="w-full h-full object-cover"
            />
          </div>
          {leadPhoto?.authorName && (
            <p className="text-xs text-[#6E675C] text-right">
              Photo by{' '}
              {leadPhoto.authorUri ? (
                <a
                  href={leadPhoto.authorUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-[#171614]"
                >
                  {leadPhoto.authorName}
                </a>
              ) : (
                leadPhoto.authorName
              )}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 border-t border-b border-[#E5E2DC] divide-y sm:divide-y-0 sm:divide-x divide-[#E5E2DC]">
        {propertyMetrics.map((item) => (
          <div key={item.label} className="py-5 px-4 sm:px-6 first:pl-0">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#171614] tabular-nums">
              {item.figure}
            </div>
            <div className="mt-1 text-sm text-[#6E675C]">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
