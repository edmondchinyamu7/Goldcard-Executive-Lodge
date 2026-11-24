import { useCallback, useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { LODGE_INFO } from '../data/lodgeData';

interface LodgeMapProps {
  center: { lat: number; lng: number };
  placeName: string;
  address: string;
}

export function LodgeMap({ center, placeName, address }: LodgeMapProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const handleClose = useCallback(() => {
    setInfoOpen(false);
  }, []);

  return (
    <div className="w-full h-[320px] sm:h-[360px] rounded-lg overflow-hidden border border-[#E5E2DC] bg-[#EDE9E0]">
      <GoogleMap
        defaultCenter={center}
        center={center}
        defaultZoom={16}
        mapId="DEMO_MAP_ID"
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={center}
          title={placeName}
          onClick={() => setInfoOpen((prev) => !prev)}
        >
          <Pin background="#171614" borderColor="#9A7B3A" glyphColor="#FAF9F6" />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow anchor={marker} onCloseClick={handleClose}>
            <div className="p-1 max-w-[220px] text-[#171614]">
              <div className="font-semibold text-sm">{placeName}</div>
              <div className="text-xs text-[#57524A] mt-0.5">{address}</div>
              <a
                href={LODGE_INFO.googleShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1.5 text-xs font-medium text-[#8A6A28] underline underline-offset-2"
              >
                Open in Google Maps
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
