import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, MapPin, Search, X } from 'lucide-react';
import type { CampusEvent } from '../data/events';
import { EventImage } from './EventImage';

interface AllEventsModalProps {
  open: boolean;
  events: CampusEvent[];
  onSelectEvent: (event: CampusEvent) => void;
  onClose: () => void;
}

export function AllEventsModal({
  open,
  events,
  onSelectEvent,
  onClose,
}: AllEventsModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const normalizedQuery = query.trim().toLowerCase();
  const visibleEvents = events.filter((event) => {
    if (!normalizedQuery) return true;
    return (
      event.title.toLowerCase().includes(normalizedQuery) ||
      event.location.toLowerCase().includes(normalizedQuery) ||
      event.categoryLabel.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171524]/55 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-events-title"
    >
      <div
        className="w-full max-w-4xl rounded-[22px] bg-[#FAF9F6] border border-black/[0.08] shadow-[0_24px_60px_rgba(17,15,28,0.28)] overflow-hidden max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 border-b border-black/[0.07] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6546E8]">
              Campus Directory
            </p>
            <h3
              id="all-events-title"
              className="mt-1 font-display text-2xl font-extrabold tracking-tight text-[#171524]"
            >
              All Upcoming Events
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-[#5C596B] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, campus, type..."
                aria-label="Search upcoming campus events"
                className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-[#FAF9F6] border border-black/[0.10] text-[#171524] placeholder:text-[#5C596B]/70 focus:outline-none focus:border-[#6546E8]"
              />
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close all events directory"
              className="w-10 h-10 rounded-full border border-black/[0.08] bg-[#FAF9F6] hover:bg-black/[0.04] flex items-center justify-center text-[#171524] cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          {visibleEvents.length === 0 ? (
            <p className="text-center py-10 text-sm text-[#5C596B]">
              No matching events found for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            visibleEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  onClose();
                  onSelectEvent(event);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClose();
                    onSelectEvent(event);
                  }
                }}
                tabIndex={0}
                role="button"
                className="group rounded-[18px] bg-white border border-black/[0.07] hover:border-[#6546E8]/35 p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5 cursor-pointer transition-all duration-200 hover:shadow-[0_10px_28px_rgba(101,70,232,0.08)]"
              >
                <div className="w-full sm:w-40 h-32 sm:h-28 rounded-[12px] overflow-hidden shrink-0 bg-[#EFEBFD]">
                  <EventImage
                    src={event.image}
                    alt={event.imageAlt}
                    fallbackTitle={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#6546E8]">
                    {event.badge}
                  </span>
                  <h4 className="mt-1 font-display text-lg font-bold text-[#171524] group-hover:text-[#6546E8] transition-colors">
                    {event.title}
                  </h4>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5C596B]">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#6546E8]" aria-hidden="true" />
                      <span>{event.date}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#6546E8]" aria-hidden="true" />
                      <span>{event.location}</span>
                    </span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center text-sm font-semibold text-[#171524] group-hover:text-[#6546E8]">
                  <span>{event.ctaLabel}</span>
                  <ArrowRight
                    className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
