import { useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

export interface PlacePhotoItem {
  id: string;
  heroUrl: string;
  cardUrl: string;
  authorName: string | null;
  authorUri: string | null;
  googleMapsUri: string | null;
}

export interface LodgePlaceDetails {
  placeId: string | null;
  displayName: string | null;
  formattedAddress: string | null;
  nationalPhoneNumber: string | null;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUri: string | null;
  location: { lat: number; lng: number } | null;
  photos: PlacePhotoItem[];
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: LodgePlaceDetails = {
  placeId: null,
  displayName: null,
  formattedAddress: null,
  nationalPhoneNumber: null,
  rating: null,
  userRatingCount: null,
  googleMapsUri: null,
  location: null,
  photos: [],
  isLoading: true,
  error: null,
};

function isQuotaError(err: unknown): boolean {
  const text = err instanceof Error ? err.message : String(err);
  return (
    text.includes('RESOURCE_EXHAUSTED') ||
    text.includes('OVER_QUERY_LIMIT') ||
    text.includes('QuotaExceededError') ||
    text.includes('429')
  );
}

export function useLodgePlaceData(enabled: boolean): LodgePlaceDetails {
  const placesLib = useMapsLibrary('places');
  const [state, setState] = useState<LodgePlaceDetails>(() => ({
    ...INITIAL_STATE,
    isLoading: enabled,
  }));

  useEffect(() => {
    if (!enabled) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    if (!placesLib) return;

    const placesLibrary = placesLib;
    let cancelled = false;

    async function loadPlaceDetails() {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const request: google.maps.places.SearchByTextRequest = {
          textQuery: 'Goldcard Executive Lodge Mombo Road Blantyre Malawi',
          fields: [
            'id',
            'displayName',
            'formattedAddress',
            'location',
            'photos',
            'rating',
            'userRatingCount',
            'googleMapsURI',
            'nationalPhoneNumber',
          ],
          maxResultCount: 1,
          internalUsageAttributionIds: ['gmp_mcp_codeassist_v1_aistudio'],
        };

        const { places } = await placesLibrary.Place.searchByText(request);
        if (cancelled) return;

        const match = places?.[0];
        if (!match) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: 'Listing details unavailable.',
          }));
          return;
        }

        const mappedPhotos: PlacePhotoItem[] = (match.photos ?? []).slice(0, 10).map((photo, idx) => {
          const primaryAttr = photo.authorAttributions?.[0];
          return {
            id: `${match.id ?? 'place'}-photo-${idx}`,
            heroUrl: photo.getURI({ maxWidth: 1600 }),
            cardUrl: photo.getURI({ maxWidth: 960 }),
            authorName: primaryAttr?.displayName ?? null,
            authorUri: primaryAttr?.uri ?? null,
            googleMapsUri: photo.googleMapsURI ?? match.googleMapsURI ?? null,
          };
        });

        const coords = match.location
          ? { lat: match.location.lat(), lng: match.location.lng() }
          : null;

        setState({
          placeId: match.id ?? null,
          displayName: match.displayName ?? null,
          formattedAddress: match.formattedAddress ?? null,
          nationalPhoneNumber: match.nationalPhoneNumber ?? null,
          rating: typeof match.rating === 'number' ? match.rating : null,
          userRatingCount:
            typeof match.userRatingCount === 'number' ? match.userRatingCount : null,
          googleMapsUri: match.googleMapsURI ?? null,
          location: coords,
          photos: mappedPhotos,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Unable to load Google Places photos right now.',
        }));
      }
    }

    void loadPlaceDetails();

    return () => {
      cancelled = true;
    };
  }, [enabled, placesLib]);

  return state;
}
