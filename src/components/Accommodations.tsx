import { ReactNode, useState } from 'react';
import { Check, X } from 'lucide-react';
import {
  CurrencyCode,
  LODGE_INFO,
  ROOM_TIERS,
  RoomTier,
  formatRoomRate,
} from '../data/lodgeData';
import { PlacePhotoItem } from '../hooks/useLodgePlaceData';
import { SafeImage } from './SafeImage';

interface AccommodationsProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
  placePhotos: PlacePhotoItem[];
  headerAction?: ReactNode;
}

type FilterOption = 'all' | 'executive' | 'standard';

export function Accommodations({
  currency,
  onCurrencyChange,
  selectedRoomId,
  onSelectRoom,
  placePhotos,
  headerAction,
}: AccommodationsProps) {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [inspectingRoom, setInspectingRoom] = useState<{
    room: RoomTier;
    photo?: PlacePhotoItem;
  } | null>(null);

  const visibleRooms = ROOM_TIERS.filter((room) => {
    if (filter === 'all') return true;
    return room.category === filter;
  });

  const handleChooseRoom = (roomId: string) => {
    onSelectRoom(roomId);
    setInspectingRoom(null);
  };

  return (
    <section
      id="accommodations"
      className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 border-b border-[#E5E2DC]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="space-y-2 max-w-2xl">
          <p className="text-sm text-[#6E675C]">Accommodations</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#171614] text-balance">
            Rooms proportioned for rest and quiet work.
          </h2>
          {headerAction && <div className="pt-1">{headerAction}</div>}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div
            role="group"
            aria-label="Filter room tiers"
            className="inline-flex items-center p-1 bg-[#F1EDE4] rounded-md border border-[#E5E2DC]"
          >
            {(
              [
                { key: 'all', label: 'All Rooms' },
                { key: 'executive', label: 'Executive' },
                { key: 'standard', label: 'Standard & Superior' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab.key
                    ? 'bg-[#FFFFFF] text-[#171614] shadow-xs'
                    : 'text-[#57524A] hover:text-[#171614]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            role="group"
            aria-label="Select display currency"
            className="inline-flex items-center p-1 bg-[#F1EDE4] rounded-md border border-[#E5E2DC]"
          >
            {(['USD', 'MWK'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => onCurrencyChange(code)}
                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  currency === code
                    ? 'bg-[#FFFFFF] text-[#171614] shadow-xs'
                    : 'text-[#57524A] hover:text-[#171614]'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {visibleRooms.map((room) => {
          const isSelected = selectedRoomId === room.id;
          const placePhotoByRoom: Record<string, PlacePhotoItem | undefined> = {
            'executive-suite': placePhotos[1] ?? placePhotos[0],
            'executive-single': placePhotos[2] ?? placePhotos[0],
            'superior-room': undefined,
            'standard-room': placePhotos[4] ?? placePhotos[0],
          };
          const placePhoto = placePhotoByRoom[room.id];
          const cardImage = placePhoto?.cardUrl || room.image;

          return (
            <article
              key={room.id}
              className={`bg-[#FFFFFF] rounded-lg border transition-colors duration-150 overflow-hidden flex flex-col ${
                isSelected ? 'border-[#9A7B3A]' : 'border-[#E5E2DC]'
              }`}
            >
              <button
                type="button"
                onClick={() => setInspectingRoom({ room, photo: placePhoto })}
                className="block w-full aspect-[4/3] overflow-hidden bg-[#EDE9E0] text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7B3A]"
              >
                <SafeImage
                  src={cardImage}
                  alt={`${room.name} at Goldcard Executive Lodge`}
                  fallbackLabel={room.name}
                  className={`w-full h-full object-cover ${
                    placePhoto ? 'object-center' : room.imageFocus || 'object-center'
                  } transition-transform duration-300 group-hover:scale-[1.02]`}
                />
              </button>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-[#6E675C] tabular-nums">
                    <span>{room.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{room.bedType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{room.sizeSqm} m²</span>
                    <span aria-hidden="true">·</span>
                    <span>{room.view}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#171614]">{room.name}</h3>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#4A453E]">
                    {room.summary}
                  </p>

                  <p className="text-xs text-[#6E675C] pt-1">
                    {room.amenities.slice(0, 3).join(' · ')}
                  </p>

                  {placePhoto?.authorName && (
                    <p className="text-xs text-[#8A8276]">
                      Photo by{' '}
                      {placePhoto.authorUri ? (
                        <a
                          href={placePhoto.authorUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-[#171614]"
                        >
                          {placePhoto.authorName}
                        </a>
                      ) : (
                        placePhoto.authorName
                      )}
                    </p>
                  )}
                </div>

                <div className="pt-5 border-t border-[#EFECE6] flex items-center justify-between gap-4">
                  <div>
                    <span className="font-serif text-2xl font-medium text-[#171614] tabular-nums">
                      {formatRoomRate(room, currency)}
                    </span>
                    <span className="text-xs text-[#6E675C] ml-1.5">/ night</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setInspectingRoom({ room, photo: placePhoto })}
                      className="px-3.5 py-2.5 text-sm font-medium text-[#57524A] hover:text-[#171614] underline underline-offset-4 decoration-[#D4CEC3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Room Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChooseRoom(room.id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#9A7B3A] text-[#FFFFFF]'
                          : 'bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925]'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4" aria-hidden="true" />}
                      <span>{isSelected ? 'Selected' : 'Select Room'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {inspectingRoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="room-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-xs"
          onClick={() => setInspectingRoom(null)}
        >
          <div
            className="bg-[#FAF9F6] border border-[#E5E2DC] rounded-lg max-w-2xl w-full overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-[#EDE9E0]">
              <SafeImage
                src={inspectingRoom.photo?.heroUrl || inspectingRoom.room.image}
                alt={inspectingRoom.room.name}
                fallbackLabel={inspectingRoom.room.name}
                className="w-full h-full object-cover object-center"
              />
              <button
                type="button"
                aria-label="Close room details"
                onClick={() => setInspectingRoom(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-md bg-[#FAF9F6]/95 text-[#171614] border border-[#E5E2DC] flex items-center justify-center hover:bg-[#FFFFFF] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <p className="text-xs text-[#6E675C] tabular-nums">
                    {inspectingRoom.room.index} · {inspectingRoom.room.bedType} ·{' '}
                    {inspectingRoom.room.sizeSqm} m² · Up to {inspectingRoom.room.maxGuests}{' '}
                    {inspectingRoom.room.maxGuests === 1 ? 'guest' : 'guests'}
                  </p>
                  <h3
                    id="room-modal-title"
                    className="font-serif text-3xl font-medium text-[#171614] mt-1"
                  >
                    {inspectingRoom.room.name}
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-serif text-2xl font-medium text-[#171614] tabular-nums">
                    {formatRoomRate(inspectingRoom.room, currency)}
                  </span>
                  <span className="text-xs text-[#6E675C] ml-1">/ night</span>
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-[#4A453E]">
                {inspectingRoom.room.summary}
              </p>

              {inspectingRoom.photo?.authorName && (
                <p className="text-xs text-[#6E675C]">
                  Photo by{' '}
                  {inspectingRoom.photo.authorUri ? (
                    <a
                      href={inspectingRoom.photo.authorUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[#171614]"
                    >
                      {inspectingRoom.photo.authorName}
                    </a>
                  ) : (
                    inspectingRoom.photo.authorName
                  )}
                </p>
              )}

              <div className="border-t border-[#E5E2DC] pt-5">
                <h4 className="text-sm font-medium text-[#171614] mb-3">
                  Included in this room
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2.5 text-sm text-[#4A453E]">
                  {inspectingRoom.room.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#9A7B3A] mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#E5E2DC] pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#6E675C] tabular-nums">
                  Check-in {LODGE_INFO.checkInTime} · Check-out {LODGE_INFO.checkOutTime}
                </p>
                <button
                  type="button"
                  onClick={() => handleChooseRoom(inspectingRoom.room.id)}
                  className="px-6 py-2.5 text-sm font-medium bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Reserve {inspectingRoom.room.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
