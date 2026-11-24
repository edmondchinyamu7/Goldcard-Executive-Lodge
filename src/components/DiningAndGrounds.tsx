import { ReactNode } from 'react';
import {
  DINING_BAR_PHOTO,
  LODGE_INFO,
  LODGE_SERVICES,
  POOL_TERRACE_PHOTO,
} from '../data/lodgeData';
import { SafeImage } from './SafeImage';

interface DiningAndGroundsProps {
  headerAction?: ReactNode;
}

export function DiningAndGrounds({ headerAction }: DiningAndGroundsProps) {
  return (
    <section
      id="dining"
      className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 border-b border-[#E5E2DC]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
        <div className="max-w-2xl space-y-2">
          <p className="text-sm text-[#6E675C]">Dining & Grounds</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#171614] text-balance">
            From morning breakfast service to quiet evenings by the pool.
          </h2>
        </div>
        {headerAction}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-stretch">
        <article className="lg:col-span-2 bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg overflow-hidden flex flex-col">
          <div className="aspect-[16/10] bg-[#EDE9E0] overflow-hidden">
            <SafeImage
              src={DINING_BAR_PHOTO.src}
              alt={DINING_BAR_PHOTO.alt}
              fallbackLabel="Lodge Restaurant & Lounge"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs text-[#6E675C] tabular-nums">
                On-Site Restaurant & Lounge · Daily {LODGE_INFO.diningHours}
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#171614]">
                The Restaurant & Executive Bar
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#4A453E] max-w-2xl">
                Serving freshly prepared Malawian and continental dishes throughout the day, from
                early business breakfasts to unhurried evening meals and curated bar refreshments.
              </p>
            </div>
            <div className="text-xs text-[#6E675C]">
              Breakfast from 06:30 · À la carte lunch & dinner · In-room dining available
            </div>
          </div>
        </article>

        <article className="lg:col-span-1 bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg overflow-hidden flex flex-col">
          <div className="aspect-[4/3] lg:aspect-auto lg:h-64 bg-[#EDE9E0] overflow-hidden">
            <SafeImage
              src={POOL_TERRACE_PHOTO.src}
              alt={POOL_TERRACE_PHOTO.alt}
              fallbackLabel="Courtyard Swimming Pool"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs text-[#6E675C] tabular-nums">
                Garden Courtyard · {LODGE_INFO.poolHours}
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#171614]">
                Pool Terrace & Gardens
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#4A453E]">
                Mature Namiwawa trees shelter the outdoor swimming pool and stone terrace, offering a
                calm retreat between appointments in Blantyre.
              </p>
            </div>
            <div className="text-xs text-[#6E675C]">
              <p>Poolside towels & beverage service</p>
            </div>
          </div>
        </article>
      </div>

      <div id="amenities" className="mt-14 pt-12 border-t border-[#E5E2DC]">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#171614]">
            Guest Services & Practicalities
          </h3>
          <p className="text-sm text-[#6E675C]">Included across all stays</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-[#E5E2DC] rounded-lg bg-[#FFFFFF] divide-y sm:divide-y-0 sm:divide-x divide-[#E5E2DC]">
          {LODGE_SERVICES.map((service) => (
            <div key={service.index} className="p-6 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="text-xs text-[#6E675C] tabular-nums">
                  {service.index} · {service.hours}
                </div>
                <h4 className="font-serif text-xl font-medium text-[#171614]">{service.title}</h4>
                <p className="text-sm leading-relaxed text-[#4A453E]">{service.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
