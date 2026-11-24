import lobbyHallwayImg from '../assets/images/unnamed.webp';
import poolEveningImg from '../assets/images/unnamed (1).webp';
import poolDayImg from '../assets/images/unnamed (2).webp';
import heroWelcomeTeamImg from '../assets/images/unnamed (3).webp';
import suiteDeskLoungeImg from '../assets/images/unnamed (4).webp';
import superiorRoomBedroomImg from '../assets/images/unnamed (5).webp';
import barLoungeImg from '../assets/images/unnamed (6).webp';
import twinGuestRoomImg from '../assets/images/unnamed (7).webp';
import boardroomImg from '../assets/images/unnamed (8).webp';
import exteriorDrivewayImg from '../assets/images/unnamed (9).webp';

export type CurrencyCode = 'USD' | 'MWK';

export interface LodgePhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
}

export interface RoomTier {
  id: string;
  index: string;
  name: string;
  category: 'executive' | 'standard';
  bedType: string;
  sizeSqm: number;
  view: string;
  maxGuests: number;
  rateUsd: number;
  rateMwk: number;
  image: string;
  imageFocus?: string;
  summary: string;
  amenities: string[];
}

export interface LodgeService {
  index: string;
  title: string;
  detail: string;
  hours: string;
}

export const HERO_LODGE_PHOTO = {
  src: heroWelcomeTeamImg,
  alt: 'Goldcard Executive Lodge hospitality team welcoming guests at the main Namiwawa entrance',
};

export const DINING_BAR_PHOTO = {
  src: barLoungeImg,
  alt: 'Stocked bar counter and seating inside the Goldcard Executive Lodge lounge',
};

export const POOL_TERRACE_PHOTO = {
  src: poolDayImg,
  alt: 'Outdoor swimming pool and shaded garden terrace at Goldcard Executive Lodge',
};

export const BOARDROOM_PHOTO = {
  src: boardroomImg,
  alt: 'Executive conference and boardroom table at Goldcard Executive Lodge',
};

export const LODGE_GALLERY_PHOTOS: LodgePhoto[] = [
  {
    id: 'welcome-entrance',
    src: heroWelcomeTeamImg,
    title: 'Main Entrance & Welcome Team',
    caption: 'Our lodge hospitality team welcoming guests beneath the main entrance portico.',
  },
  {
    id: 'superior-room',
    src: superiorRoomBedroomImg,
    title: 'Superior Guest Bedroom',
    caption: 'Curved timber-and-leather bed frame with crisp white linens and draped canopy.',
  },
  {
    id: 'executive-suite',
    src: suiteDeskLoungeImg,
    title: 'Executive Suite',
    caption: 'Carved wooden headboard, private writing desk, leather sofa, and in-room fridge.',
  },
  {
    id: 'twin-standard-room',
    src: twinGuestRoomImg,
    title: 'Twin Guest Room',
    caption: 'Two individual beds with patterned linens and a dedicated guest mini-fridge.',
  },
  {
    id: 'pool-daytime',
    src: poolDayImg,
    title: 'Courtyard Swimming Pool',
    caption: 'Sunlit outdoor swimming pool framed by red brick coping and covered seating.',
  },
  {
    id: 'pool-evening',
    src: poolEveningImg,
    title: 'Evening Poolside Courtyard',
    caption: 'Warm string lights across the garden bar terrace and pool after dusk.',
  },
  {
    id: 'bar-lounge',
    src: barLoungeImg,
    title: 'Executive Bar & Lounge',
    caption: 'Full-service wooden bar counter with chilled beverages and evening refreshments.',
  },
  {
    id: 'arched-lobby',
    src: lobbyHallwayImg,
    title: 'Arched Lobby Corridor',
    caption: 'Sunlit interior colonnade with coffered timber ceiling, chandelier, and greenery.',
  },
  {
    id: 'executive-boardroom',
    src: boardroomImg,
    title: 'Executive Boardroom',
    caption: 'Private conference table, leather seating, and presentation screen for meetings.',
  },
  {
    id: 'lodge-exterior',
    src: exteriorDrivewayImg,
    title: 'Driveway & Portico Arrival',
    caption: 'Gated compound arrival driveway and arched facade off Mombo Road in Namiwawa.',
  },
];

export const LODGE_INFO = {
  name: 'Goldcard Executive Lodge',
  shortLocation: 'Mombo Road · Namiwawa, Blantyre',
  fullAddress: 'Off Mombo Road, Namiwawa Township, Blantyre, Malawi',
  phone: '+265 884 57 06 38',
  phoneHref: 'tel:+265884570638',
  googleShareUrl: 'https://share.google/KNvXD5jxe0GpVhoK8',
  checkInTime: '14:00',
  checkOutTime: '10:00',
  frontDeskHours: '24 Hours Daily',
  diningHours: '06:30 – 22:00',
  poolHours: '07:00 – 19:30',
};

export const ROOM_TIERS: RoomTier[] = [
  {
    id: 'executive-suite',
    index: '01',
    name: 'Executive Suite',
    category: 'executive',
    bedType: 'Queen Bed & Lounge',
    sizeSqm: 48,
    view: 'Pool & Garden View',
    maxGuests: 2,
    rateUsd: 135,
    rateMwk: 235000,
    image: suiteDeskLoungeImg,
    imageFocus: 'object-center',
    summary:
      'Designed for extended executive stays with a carved timber headboard, dedicated study desk, leather lounge seating, and in-room refrigerator.',
    amenities: [
      'Private work desk & study chair',
      'Leather lounge seating & coffee table',
      'In-room refrigerator & kettle',
      'Complimentary high-speed Wi-Fi',
      'Air conditioning & mosquito canopy',
      'Daily housekeeping & laundry service',
    ],
  },
  {
    id: 'executive-single',
    index: '02',
    name: 'Executive Single',
    category: 'executive',
    bedType: 'Queen Bed',
    sizeSqm: 34,
    view: 'Courtyard View',
    maxGuests: 1,
    rateUsd: 105,
    rateMwk: 185000,
    image: suiteDeskLoungeImg,
    imageFocus: 'object-left',
    summary:
      'Tailored for solo business travelers seeking quiet desk workspace in Namiwawa, minutes from Blantyre CBD offices and diplomatic missions.',
    amenities: [
      'Writing desk with power & task lamp',
      'Complimentary high-speed Wi-Fi',
      'In-room refrigerator & tea station',
      'Direct-dial telephone',
      'Breakfast included at the lodge restaurant',
      '24-hour room service access',
    ],
  },
  {
    id: 'superior-room',
    index: '03',
    name: 'Superior Room',
    category: 'standard',
    bedType: 'King Bed',
    sizeSqm: 32,
    view: 'Garden Walk',
    maxGuests: 2,
    rateUsd: 88,
    rateMwk: 155000,
    image: superiorRoomBedroomImg,
    imageFocus: 'object-center',
    summary:
      'Curved timber-and-cream-leather king bed dressed in crisp white cotton linens, warm drapery, bedside lamps, and direct courtyard access.',
    amenities: [
      'King bed with crisp cotton linens',
      'Draped mosquito canopy & warm drapery',
      'Complimentary high-speed Wi-Fi',
      'En-suite bathroom with fresh towels',
      'Bedside telephone & wardrobe',
      'Private secure parking included',
    ],
  },
  {
    id: 'standard-room',
    index: '04',
    name: 'Standard Twin Room',
    category: 'standard',
    bedType: 'Twin Beds',
    sizeSqm: 26,
    view: 'Namiwawa Grounds',
    maxGuests: 2,
    rateUsd: 72,
    rateMwk: 125000,
    image: twinGuestRoomImg,
    imageFocus: 'object-center',
    summary:
      'A calm twin-bed sanctuary for colleagues or overnight visitors in Blantyre, complete with central mini-fridge and 24-hour front desk support.',
    amenities: [
      'Two single beds with crisp linens',
      'In-room refrigerator',
      'Complimentary Wi-Fi',
      'En-suite shower',
      '24-hour front desk support',
      'On-site laundry availability',
    ],
  },
];

export const LODGE_SERVICES: LodgeService[] = [
  {
    index: '01',
    title: '24-Hour Front Desk',
    detail: 'Round-the-clock reception for late arrivals, early departures, and Blantyre local assistance.',
    hours: 'Open 24 Hours',
  },
  {
    index: '02',
    title: 'Private Secure Parking',
    detail: 'Gated on-site parking tucked off quiet Mombo Road inside the Namiwawa compound.',
    hours: 'Complimentary',
  },
  {
    index: '03',
    title: 'Laundry & Pressing',
    detail: 'Same-day garment care and pressing tailored for business travelers and multi-night guests.',
    hours: '07:00 – 18:00',
  },
  {
    index: '04',
    title: 'Entertainment & Lounge',
    detail: 'Evening drinks in the lodge lounge with adjacent leisure and gaming house access on site.',
    hours: 'Evening Service',
  },
];

export const NEARBY_LANDMARKS = [
  { name: 'Seventh-Day Adventist Hospital', distance: '3 min drive' },
  { name: 'Embassy of Mozambique', distance: '4 min drive' },
  { name: 'Blantyre Central Business District', distance: '3.5 km · 10 min' },
  { name: 'Chileka International Airport', distance: '25 min drive' },
];

export function formatRoomRate(room: RoomTier, currency: CurrencyCode): string {
  if (currency === 'USD') {
    return `$${room.rateUsd.toLocaleString('en-US')}`;
  }
  return `MWK ${room.rateMwk.toLocaleString('en-US')}`;
}
