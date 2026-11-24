import { ReactNode, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { LODGE_INFO } from '../data/lodgeData';
import { PlacePhotoItem } from '../hooks/useLodgePlaceData';
import { SafeImage } from './SafeImage';

interface PlacePhotoGalleryProps {
  photos: PlacePhotoItem[];
  isLoading: boolean;
  googleMapsUri: string | null;
  secondaryAction?: ReactNode;
}

export function PlacePhotoGallery({
  photos,
  isLoading,
  googleMapsUri,
  secondaryAction,
}: PlacePhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) {
    return (
      <section
        id="gallery"
        className="max-w-7xl mx-auto px-6 lg:px-10 py-14 border-b border-[#E5E2DC]"
      >
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <div className="space-y-1">
            <p className="text-sm text-[#6E675C]">Property Gallery</p>
            <h2 className="font-serif text-3xl font-medium text-[#171614]">
              Photographs from the lodge listing
            </h2>
          </div>
        </div>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 aspect-[16/10] rounded-lg bg-[#EDE9E0] animate-pulse" />
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((slot) => (
              <div key={slot} className="aspect-[4/3] rounded-md bg-[#EDE9E0] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  const safeIndex = activeIndex < photos.length ? activeIndex : 0;
  const activePhoto = photos[safeIndex];

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <section
      id="gallery"
      className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 border-b border-[#E5E2DC]"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-2 max-w-2xl">
          <p className="text-sm text-[#6E675C]">Property Gallery</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#171614] text-balance">
            On-site photographs from Goldcard Executive Lodge.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {secondaryAction}
          <a
            href={googleMapsUri || LODGE_INFO.googleShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#171614] hover:text-[#8A6A28] underline underline-offset-4 decoration-[#D4CEC3] whitespace-nowrap shrink-0"
          >
            <span>View All on Google Maps</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
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
                  onClick={goPrev}
                  className="w-10 h-10 rounded-md bg-[#FAF9F6]/95 border border-[#E5E2DC] text-[#171614] flex items-center justify-center hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next lodge photograph"
                  onClick={goNext}
                  className="w-10 h-10 rounded-md bg-[#FAF9F6]/95 border border-[#E5E2DC] text-[#171614] flex items-center justify-center hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E675C]">
            <span className="tabular-nums">
              Photo {safeIndex + 1} of {photos.length}
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

        <div className="lg:col-span-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-3">
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
      </div>
    </section>
  );
}
