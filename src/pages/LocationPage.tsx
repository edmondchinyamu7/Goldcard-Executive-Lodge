import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { LODGE_INFO, NEARBY_LANDMARKS } from '../data/lodgeData';
import { LodgePlaceDetails } from '../hooks/useLodgePlaceData';
import { PageHeader } from '../components/PageHeader';
import { LodgeMap } from '../components/LodgeMap';

interface LocationPageProps {
  placeData: LodgePlaceDetails;
  mapsAvailable: boolean;
}

export function LocationPage({ placeData, mapsAvailable }: LocationPageProps) {
  const displayAddress = placeData.formattedAddress || LODGE_INFO.fullAddress;
  const displayPhone = placeData.nationalPhoneNumber || LODGE_INFO.phone;
  const displayMapsUrl = placeData.googleMapsUri || LODGE_INFO.googleShareUrl;

  return (
    <>
      <PageHeader
        sectionLabel="Location & Directions"
        title="Quietly tucked off Mombo Road in Namiwawa."
        description="Positioned in one of Blantyre's established low-density suburbs, roughly 3.5 km north of the Central Business District and within minutes of diplomatic missions and hospitals."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            {mapsAvailable && placeData.location ? (
              <LodgeMap
                center={placeData.location}
                placeName={placeData.displayName || LODGE_INFO.name}
                address={displayAddress}
              />
            ) : (
              <div className="w-full h-[320px] sm:h-[360px] rounded-lg border border-[#E5E2DC] bg-[#F4F1EA] flex flex-col items-center justify-center p-8 text-center space-y-4">
                <MapPin className="w-7 h-7 text-[#9A7B3A]" aria-hidden="true" />
                <div className="space-y-1 max-w-md">
                  <div className="font-serif text-2xl font-medium text-[#171614]">
                    {LODGE_INFO.name}
                  </div>
                  <p className="text-sm text-[#4A453E]">{displayAddress}</p>
                </div>
                <a
                  href={displayMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-[#171614] text-[#FAF9F6] rounded-md"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            )}

            <div className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg p-6 space-y-3">
              <h2 className="font-serif text-2xl font-medium text-[#171614]">Arrival Guidance</h2>
              <p className="text-sm leading-relaxed text-[#4A453E]">
                From Chileka International Airport, follow Chileka Road south toward Blantyre and
                turn into Namiwawa Township along Mombo Road. Gated guest parking is available inside
                the lodge compound 24 hours a day.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg p-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#9A7B3A] mt-0.5 shrink-0" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="text-sm font-medium text-[#171614]">Address</div>
                  <p className="text-sm text-[#4A453E]">{displayAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-[#EFECE6]">
                <Phone className="w-5 h-5 text-[#9A7B3A] mt-0.5 shrink-0" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="text-sm font-medium text-[#171614]">24-Hour Front Desk</div>
                  <a
                    href={`tel:${displayPhone.replace(/\s+/g, '')}`}
                    className="text-sm text-[#171614] hover:text-[#9A7B3A] underline underline-offset-4 decoration-[#D4CEC3] tabular-nums"
                  >
                    {displayPhone}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFECE6] flex flex-col gap-3">
                <a
                  href={displayMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925] rounded-md transition-colors whitespace-nowrap"
                >
                  <span>Open Directions on Google Maps</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  to="/reserve"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium border border-[#171614] text-[#171614] hover:bg-[#F2EFE8] rounded-md transition-colors whitespace-nowrap"
                >
                  Book a Room
                </Link>
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg p-6">
              <h2 className="text-sm font-medium text-[#171614] mb-4">Nearby Landmarks</h2>
              <dl className="divide-y divide-[#EFECE6] text-sm">
                {NEARBY_LANDMARKS.map((landmark) => (
                  <div
                    key={landmark.name}
                    className="py-2.5 flex items-center justify-between gap-4"
                  >
                    <dt className="text-[#4A453E]">{landmark.name}</dt>
                    <dd className="text-[#6E675C] tabular-nums shrink-0">{landmark.distance}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
