import { Link } from 'react-router-dom';
import { LODGE_INFO } from '../data/lodgeData';
import { LodgePlaceDetails } from '../hooks/useLodgePlaceData';
import { PageHeader } from '../components/PageHeader';
import { DiningAndGrounds } from '../components/DiningAndGrounds';

interface DiningPageProps {
  placeData: LodgePlaceDetails;
}

const DINING_SESSIONS = [
  {
    index: '01',
    name: 'Executive Breakfast',
    hours: '06:30 – 10:00',
    description:
      'Fresh seasonal fruit, cooked-to-order eggs, baked pastries, and locally roasted Malawian coffee served before morning meetings.',
  },
  {
    index: '02',
    name: 'All-Day Lunch & Dinner',
    hours: '12:00 – 22:00',
    description:
      'Grilled Lake Malawi Chambo, Malawian stews, salads, and continental classics available in the restaurant or via room service.',
  },
  {
    index: '03',
    name: 'Pool Terrace & Bar',
    hours: '10:00 – 23:00',
    description:
      'Chilled refreshments, espresso service, and evening cocktails enjoyed poolside or in the executive lounge.',
  },
];

export function DiningPage({ placeData }: DiningPageProps) {
  return (
    <>
      <PageHeader
        sectionLabel="Dining & Pool"
        title="Freshly prepared Malawian and continental dining."
        description={`Open daily (${LODGE_INFO.diningHours}) for hotel guests and visiting colleagues in Namiwawa, paired with shaded poolside service.`}
      />

      <DiningAndGrounds placePhotos={placeData.photos} />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <p className="text-sm text-[#6E675C]">Daily Service Schedule</p>
            <h2 className="font-serif text-3xl font-medium text-[#171614]">
              Kitchen & Lounge Hours
            </h2>
          </div>

          <Link
            to="/reserve"
            className="px-5 py-2.5 text-sm font-medium bg-[#171614] text-[#FAF9F6] hover:bg-[#2B2925] rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            Reserve a Stay
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {DINING_SESSIONS.map((session) => (
            <article
              key={session.index}
              className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg p-6 space-y-3"
            >
              <div className="text-xs text-[#6E675C] tabular-nums">
                {session.index} · {session.hours}
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#171614]">{session.name}</h3>
              <p className="text-sm leading-relaxed text-[#4A453E]">{session.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
