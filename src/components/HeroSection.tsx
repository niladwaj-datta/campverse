import { ArrowDownRight } from 'lucide-react';
import { HERO_MEDIA } from '../data/events';
import { EventImage } from './EventImage';

interface HeroSectionProps {
  onOpenHostModal: () => void;
}

export function HeroSection({ onOpenHostModal }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-black/[0.06]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center py-2">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#6546E8] mb-4">
              Campus Life, Curated
            </p>
            <h1 className="font-display text-[clamp(2.35rem,4.4vw,3.75rem)] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#171524] [text-wrap:balance]">
              Find the moments that define{' '}
              <span className="text-[#6546E8]">campus life.</span>
            </h1>
            <p className="mt-5 text-base sm:text-[17px] leading-[1.65] text-[#5C596B] max-w-[54ch]">
              Explore late-night hackathons, intimate design critiques, and packed auditorium festivals happening across colleges near you.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#trending-events"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#171524] hover:bg-[#6546E8] text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6546E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F6]"
              >
                <span>Browse Trending Events</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenHostModal}
                className="inline-flex items-center px-5 py-3.5 rounded-full border border-black/[0.12] bg-white hover:border-[#6546E8]/45 text-[#171524] text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6546E8]"
              >
                Submit a Campus Event
              </button>
            </div>

            <div className="mt-10 pt-6 border-t border-black/[0.06] flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#5C596B]">
              <div>
                <span className="font-display font-bold text-[#171524] tabular-nums">40+</span>{' '}
                <span>Partner Campuses</span>
              </div>
              <span aria-hidden="true" className="text-black/15">
                /
              </span>
              <div>
                <span className="font-display font-bold text-[#171524] tabular-nums">120+</span>{' '}
                <span>Monthly Gatherings</span>
              </div>
              <span aria-hidden="true" className="text-black/15">
                /
              </span>
              <div>
                <span className="font-display font-bold text-[#171524]">Student-Led</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] rounded-[20px] overflow-hidden border border-black/[0.07] shadow-[0_12px_36px_rgba(23,21,36,0.08)]">
              <EventImage
                src={HERO_MEDIA.image}
                alt={HERO_MEDIA.alt}
                fallbackTitle="CampVerse Campus Quad"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
