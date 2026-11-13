import { ArrowRight, Calendar, MapPin, Tag } from 'lucide-react';
import {
  CampusEvent,
  EVENT_CATEGORIES,
  EventFilterCategory,
} from '../data/events';
import { EventImage } from './EventImage';

interface TrendingEventsSectionProps {
  events: CampusEvent[];
  activeCategory: EventFilterCategory;
  onSelectCategory: (category: EventFilterCategory) => void;
  onSelectEvent: (event: CampusEvent) => void;
  onExploreAll: () => void;
}

export function TrendingEventsSection({
  events,
  activeCategory,
  onSelectCategory,
  onSelectEvent,
  onExploreAll,
}: TrendingEventsSectionProps) {
  const isDefaultShowcase = activeCategory === 'All Events';

  // For the flagship "All Events" view, always spotlight the three curated editorial cards
  const featuredEvent =
    events.find((e) => e.id === 'codestorm-2026') ?? events[0];
  const secondaryEvents = [
    events.find((e) => e.id === 'design-beyond-limits') ?? events[1],
    events.find((e) => e.id === 'campus-carnival') ?? events[2],
  ].filter((e): e is CampusEvent => Boolean(e));

  const filteredEvents = isDefaultShowcase
    ? events
    : events.filter((event) => event.filterCategory === activeCategory);

  return (
    <section
      id="trending-events"
      aria-labelledby="trending-events-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#FAF9F6]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* 1. Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#6546E8] mb-3">
              DISCOVER • CONNECT • EXPERIENCE
            </p>
            <h2
              id="trending-events-heading"
              className="font-display text-[clamp(2rem,3.6vw,3rem)] font-extrabold tracking-[-0.03em] leading-[1.08] text-[#171524] [text-wrap:balance]"
            >
              Something&apos;s{' '}
              <span className="text-[#6546E8]">Happening.</span>
            </h2>
            <p className="mt-3.5 text-base sm:text-[17px] leading-[1.6] text-[#5C596B] max-w-[58ch]">
              From exciting hackathons to unforgettable campus festivals — find the
              experiences worth showing up for.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreAll}
            className="group self-start md:self-end inline-flex items-center gap-2 text-sm font-semibold text-[#171524] hover:text-[#6546E8] transition-colors duration-200 whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6546E8] rounded-md"
          >
            <span>Explore All Events</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* 2. Featured Event Layout */}
        {isDefaultShowcase && featuredEvent ? (
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-6 items-stretch">
            {/* Featured Card — 55% Width */}
            <article
              onClick={() => onSelectEvent(featuredEvent)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectEvent(featuredEvent);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${featuredEvent.title} — ${featuredEvent.categoryLabel}`}
              className="group relative min-h-[430px] sm:min-h-[490px] lg:min-h-[540px] rounded-[20px] overflow-hidden bg-[#171524] shadow-[0_10px_32px_rgba(23,21,36,0.10)] hover:shadow-[0_20px_44px_rgba(101,70,232,0.18)] transition-all duration-300 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6546E8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF9F6]"
            >
              <EventImage
                src={featuredEvent.image}
                alt={featuredEvent.imageAlt}
                fallbackTitle={featuredEvent.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />

              {/* Measured Scrim for Guaranteed WCAG AA Legibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#120F1F]/95 via-[#120F1F]/50 to-[#120F1F]/15"
              />

              {/* Top Editorial Kicker */}
              <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#6546E8] text-white text-[11px] font-bold tracking-[0.12em] uppercase shadow-[0_4px_12px_rgba(101,70,232,0.35)]">
                  {featuredEvent.badge}
                </span>
              </div>

              {/* Bottom Editorial Details */}
              <div className="relative z-10 p-6 sm:p-8 pt-12">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-[13px] font-medium text-white/85 mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B9A7FF]" aria-hidden="true" />
                    <span>{featuredEvent.date}</span>
                  </span>
                  <span aria-hidden="true" className="text-white/40">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B9A7FF]" aria-hidden="true" />
                    <span>{featuredEvent.location}</span>
                  </span>
                  <span aria-hidden="true" className="text-white/40">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#B9A7FF]" aria-hidden="true" />
                    <span>{featuredEvent.categoryLabel}</span>
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white leading-[1.15]">
                  {featuredEvent.title}
                </h3>

                <p className="mt-2.5 text-sm sm:text-base text-white/85 leading-[1.55] max-w-[46ch]">
                  {featuredEvent.description}
                </p>

                <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#D5CAFF] transition-colors duration-200">
                    <span>{featuredEvent.ctaLabel}</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </article>

            {/* Right Column — 45% Width, 2 Stacked Editorial Cards */}
            <div className="flex flex-col gap-6 h-full">
              {secondaryEvents.map((event) => (
                <article
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectEvent(event);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${event.title} — ${event.badge}`}
                  className="group flex-1 rounded-[20px] bg-white border border-black/[0.07] shadow-[0_4px_20px_rgba(23,21,36,0.04)] hover:shadow-[0_14px_34px_rgba(101,70,232,0.10)] hover:border-[#6546E8]/30 transition-all duration-300 overflow-hidden cursor-pointer grid grid-cols-1 sm:grid-cols-[44%_1fr] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6546E8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF9F6]"
                >
                  {/* Carefully Cropped Editorial Photo */}
                  <div className="relative min-h-[210px] sm:min-h-full overflow-hidden bg-[#EFEBFD]">
                    <EventImage
                      src={event.image}
                      alt={event.imageAlt}
                      fallbackTitle={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Clean Card Body */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between gap-5">
                    <div>
                      <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-[#6546E8]">
                        {event.badge}
                      </span>

                      <h3 className="mt-2 font-display text-xl sm:text-[22px] font-bold tracking-tight text-[#171524] leading-snug group-hover:text-[#6546E8] transition-colors duration-200">
                        {event.title}
                      </h3>

                      <div className="mt-3.5 space-y-1.5 text-[13px] text-[#5C596B]">
                        <p className="flex items-center gap-2">
                          <Calendar
                            className="w-3.5 h-3.5 text-[#6546E8]/80 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{event.date}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin
                            className="w-3.5 h-3.5 text-[#6546E8]/80 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{event.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#171524] group-hover:text-[#6546E8] transition-colors duration-200">
                        <span>{event.ctaLabel}</span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          /* Filtered Category View */
          <div>
            <div className="flex items-center justify-between mb-5 text-sm text-[#5C596B]">
              <span>
                Showing{' '}
                <strong className="font-semibold text-[#171524] tabular-nums">
                  {filteredEvents.length}
                </strong>{' '}
                {filteredEvents.length === 1 ? 'event' : 'events'} in{' '}
                <span className="text-[#6546E8] font-medium">{activeCategory}</span>
              </span>
              <button
                type="button"
                onClick={() => onSelectCategory('All Events')}
                className="text-xs font-semibold text-[#6546E8] hover:underline cursor-pointer"
              >
                Reset to featured view
              </button>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="rounded-[20px] bg-white border border-black/[0.07] p-12 text-center">
                <p className="font-display text-lg font-bold text-[#171524]">
                  No events listed in {activeCategory} yet.
                </p>
                <p className="mt-2 text-sm text-[#5C596B]">
                  Check back soon or return to all trending campus events.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectCategory('All Events')}
                  className="mt-5 px-5 py-2.5 rounded-full bg-[#6546E8] text-white text-sm font-semibold cursor-pointer"
                >
                  View All Events
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <article
                    key={event.id}
                    onClick={() => onSelectEvent(event)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectEvent(event);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${event.title} — ${event.badge}`}
                    className="group rounded-[20px] bg-white border border-black/[0.07] shadow-[0_4px_20px_rgba(23,21,36,0.04)] hover:shadow-[0_14px_34px_rgba(101,70,232,0.10)] hover:border-[#6546E8]/30 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6546E8]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEBFD]">
                      <EventImage
                        src={event.image}
                        alt={event.imageAlt}
                        fallbackTitle={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-[#6546E8]">
                          {event.badge}
                        </span>
                        <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-[#171524] group-hover:text-[#6546E8] transition-colors">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#5C596B] leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-black/[0.06] space-y-3">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#5C596B]">
                          <span>{event.date}</span>
                          <span aria-hidden="true">·</span>
                          <span>{event.location}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#171524] group-hover:text-[#6546E8] transition-colors">
                          <span>{event.ctaLabel}</span>
                          <ArrowRight
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Category Filters */}
        <div
          role="tablist"
          aria-label="Filter trending campus events by category"
          className="mt-9 sm:mt-10 flex flex-wrap items-center gap-2.5"
        >
          {EVENT_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6546E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F6] ${
                  isActive
                    ? 'bg-[#6546E8] text-white shadow-[0_6px_18px_rgba(101,70,232,0.28)]'
                    : 'bg-white/80 text-[#4B485B] border border-black/[0.10] hover:border-[#6546E8]/45 hover:text-[#171524] hover:bg-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
