import suiteExecutiveImg from '../assets/images/suite_executive_1795506859799.jpg';
import roomSuperiorImg from '../assets/images/room_superior_1795506860091.jpg';

export type CurrencyCode = 'USD' | 'MWK';

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
    bedType: 'King Bed',
    sizeSqm: 48,
    view: 'Pool & Garden View',
    maxGuests: 2,
    rateUsd: 135,
    rateMwk: 235000,
    image: suiteExecutiveImg,
    summary:
      'Designed for extended executive stays with a dedicated study desk, private garden terrace access, and serene timber-and-stone interiors.',
    amenities: [
      'Private work desk & ergonomic seating',
      'Complimentary high-speed Wi-Fi',
      'Air conditioning & ceiling fan',
      'En-suite walk-in rainfall shower',
      'Tea & Malawian coffee station',
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
    image: roomSuperiorImg,
    imageFocus: 'object-right',
    summary:
      'Tailored for solo business travelers seeking quiet focus in Namiwawa, just minutes from Blantyre CBD offices and diplomatic missions.',
    amenities: [
      'Writing desk with power & task lamp',
      'Complimentary high-speed Wi-Fi',
      'Air conditioning',
      'Flat-screen satellite television',
      'Breakfast included at the lodge restaurant',
      '24-hour room service access',
    ],
  },
  {
    id: 'superior-room',
    index: '03',
    name: 'Superior Room',
    category: 'standard',
    bedType: 'Queen Bed',
    sizeSqm: 30,
    view: 'Garden Walk',
    maxGuests: 2,
    rateUsd: 88,
    rateMwk: 155000,
    image: roomSuperiorImg,
    imageFocus: 'object-center',
    summary:
      'Warm stone textures, crisp cotton linens, and direct access to shaded courtyard pathways leading toward the outdoor swimming pool.',
    amenities: [
      'Queen bed with breathable cotton bedding',
      'Complimentary high-speed Wi-Fi',
      'Air conditioning',
      'En-suite bathroom with fresh towels',
      'In-room safe & wardrobe',
      'Private secure parking included',
    ],
  },
  {
    id: 'standard-room',
    index: '04',
    name: 'Standard Room',
    category: 'standard',
    bedType: 'Double Bed',
    sizeSqm: 24,
    view: 'Namiwawa Grounds',
    maxGuests: 2,
    rateUsd: 72,
    rateMwk: 125000,
    image: suiteExecutiveImg,
    imageFocus: 'object-left',
    summary:
      'A calm, well-proportioned sanctuary for overnight stays and weekend visits in Blantyre, supported by full 24-hour front desk care.',
    amenities: [
      'Double bed with crisp linens',
      'Complimentary Wi-Fi',
      'Climate control',
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
