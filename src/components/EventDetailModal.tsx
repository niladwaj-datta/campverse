import { useEffect } from 'react';
import { Calendar, Check, Clock, MapPin, Users, X } from 'lucide-react';
import { CampusEvent } from '../data/events';
import { EventImage } from './EventImage';

interface EventDetailModalProps {
  event: CampusEvent | null;
  isRsvped: boolean;
  onToggleRsvp: (eventId: string) => void;
  onClose: () => void;
}

export function EventDetailModal({
  event,
  isRsvped,
  onToggleRsvp,
  onClose,
}: EventDetailModalProps) {
  useEffect(() => {
    if (!event) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171524]/55 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
    >
      <div
        className="relative w-full max-w-2xl rounded-[22px] bg-[#FAF9F6] border border-black/[0.08] shadow-[0_24px_60px_rgba(17,15,28,0.28)] overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 sm:h-64 shrink-0 overflow-hidden bg-[#171524]">
          <EventImage
            src={event.image}
            alt={event.imageAlt}
            fallbackTitle={event.title}
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#120F1F]/80 via-transparent to-black/25"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close event details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#171524] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#6546E8] text-white text-[11px] font-bold tracking-[0.12em] uppercase">
              {event.badge}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <p className="text-xs font-medium text-[#5C596B]">
              Hosted by <span className="text-[#171524] font-semibold">{event.organizer}</span>
            </p>
            <h3
              id="modal-event-title"
              className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171524]"
            >
              {event.title}
            </h3>
            <p className="mt-3 text-base text-[#5C596B] leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-4 border-y border-black/[0.08] text-sm text-[#171524]">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#6546E8] shrink-0" aria-hidden="true" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#6546E8] shrink-0" aria-hidden="true" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#6546E8] shrink-0" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#6546E8] shrink-0" aria-hidden="true" />
              <span className="tabular-nums">
                {isRsvped ? event.spotsRemaining - 1 : event.spotsRemaining} spots available
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[#171524] mb-3">
              What to expect
            </h4>
            <ul className="space-y-2 text-sm text-[#5C596B]">
              {event.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6546E8] shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#5C596B]">
              Free entry with valid student ID
            </span>
            <button
              type="button"
              onClick={() => onToggleRsvp(event.id)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isRsvped
                  ? 'bg-[#171524] text-white hover:bg-[#2a273f]'
                  : 'bg-[#6546E8] text-white hover:bg-[#5235CC] shadow-[0_6px_18px_rgba(101,70,232,0.28)]'
              }`}
            >
              {isRsvped && <Check className="w-4 h-4" aria-hidden="true" />}
              <span>{isRsvped ? 'Spot Reserved' : 'Reserve Your Spot'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
