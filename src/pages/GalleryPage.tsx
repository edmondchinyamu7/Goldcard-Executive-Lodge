import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { LODGE_INFO } from '../data/lodgeData';
import { LodgePlaceDetails } from '../hooks/useLodgePlaceData';
import { PageHeader } from '../components/PageHeader';
import { SafeImage } from '../components/SafeImage';

interface GalleryPageProps {
  placeData: LodgePlaceDetails;
}

export function GalleryPage({ placeData }: GalleryPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = placeData.photos;

  const safeIndex = photos.length > 0 && activeIndex < photos.length ? activeIndex : 0;
  const activePhoto = photos[safeIndex];

  return (
    <>
      <PageHeader
        sectionLabel="Gallery"
        title="On-site photography from Goldcard Executive Lodge."
        description="Explore verified photographs of the lodge grounds, rooms, lounge, and Namiwawa surroundings sourced from the property's Google listing."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 space-y-10">
        {placeData.isLoading ? (
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 aspect-[16/10] rounded-lg bg-[#EDE9E0] animate-pulse" />
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="aspect-[4/3] rounded-md bg-[#EDE9E0] animate-pulse" />
              ))}
            </div>
          </div>
        ) : photos.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg p-8 text-center space-y-4">
            <p className="text-base text-[#4A453E]">
              Live Google Places photographs are currently unavailable. You can view the full photo
              collection directly on Google Maps.
            </p>
            <a
              href={placeData.googleMapsUri || LODGE_INFO.googleShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-[#171614] text-[#FAF9F6] rounded-md"
            >
              <span>Open Photos on Google Maps</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-3">
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[#E5E2DC] bg-[#EDE9E0]">
                  <SafeImage
                    src={activePhoto.heroUrl}
                    alt={`Goldcard Executive Lodge photograph ${safeIndex + 1} of ${photos.length}`}
                    fallbackLabel="Goldcard Executive Lodge"
                    className="w-full h-full object-cover"
                  />
                  {photos.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Previous lodge photograph"
                        onClick={() =>
                          setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)
                        }
                        className="w-10 h-10 rounded-md bg-[#FAF9F6]/95 border border-[#E5E2DC] text-[#171614] flex items-center justify-center hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next lodge photograph"
                        onClick={() => setActiveIndex((prev) => (prev + 1) % photos.length)}
                        className="w-10 h-10 rounded-md bg-[#FAF9F6]/95 border border-[#E5E2DC] text-[#171614] flex items-center justify-center hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6E675C]">
                  <span className="tabular-nums">
                    Photograph {safeIndex + 1} of {photos.length}
                  </span>
                  {activePhoto.authorName && (
                    <span>
                      Photo attribution:{' '}
                      {activePhoto.authorUri ? (
                        <a
                          href={activePhoto.authorUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-[#171614]"
                        >
                          {activePhoto.authorName}
                        </a>
                      ) : (
                        activePhoto.authorName
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-5">
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                  {photos.map((photo, index) => {
                    const isActive = index === safeIndex;
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Select photograph ${index + 1}`}
                        className={`aspect-[4/3] rounded-md overflow-hidden border transition-all cursor-pointer bg-[#EDE9E0] ${
                          isActive
                            ? 'border-[#171614] ring-2 ring-[#9A7B3A]'
                            : 'border-[#E5E2DC] opacity-80 hover:opacity-100'
                        }`}
                      >
                        <SafeImage
                          src={photo.cardUrl}
                          alt={`Goldcard Executive Lodge thumbnail ${index + 1}`}
                          fallbackLabel={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-[#E5E2DC] flex flex-wrap items-center gap-4">
                  <Link
                    to="/reserve"
                    className="px-5 py-2.5 text-sm font-medium bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925] rounded-md transition-colors whitespace-nowrap"
                  >
                    Reserve a Stay
                  </Link>
                  <a
                    href={placeData.googleMapsUri || LODGE_INFO.googleShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171614] hover:text-[#9A7B3A] underline underline-offset-4 decoration-[#D4CEC3]"
                  >
                    <span>View on Google Maps</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
