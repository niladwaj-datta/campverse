import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { CampusEvent, EventFilterCategory, INITIAL_CAMPUS_EVENTS } from '../data/events';

interface HostEventModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitEvent: (newEvent: CampusEvent) => void;
}

const HOST_CATEGORIES: Exclude<EventFilterCategory, 'All Events'>[] = [
  'Hackathons',
  'Workshops',
  'Cultural',
  'Tech Talks',
  'Design',
];

export function HostEventModal({
  open,
  onClose,
  onSubmitEvent,
}: HostEventModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] =
    useState<Exclude<EventFilterCategory, 'All Events'>>('Workshops');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !location.trim()) {
      setError('Please enter an event title, date, and campus location.');
      return;
    }

    const fallbackEvent =
      INITIAL_CAMPUS_EVENTS.find((item) => item.filterCategory === category) ??
      INITIAL_CAMPUS_EVENTS[3];

    const createdEvent: CampusEvent = {
      id: `custom-${Date.now()}`,
      badge: category.toUpperCase(),
      title: title.trim(),
      description:
        description.trim() ||
        'Student-hosted campus gathering open to all builders and creators.',
      date: date.trim(),
      time: '04:00 PM – 07:00 PM IST',
      location: location.trim(),
      categoryLabel: category,
      filterCategory: category,
      ctaLabel: 'View Details',
      image: fallbackEvent.image,
      imageAlt: `${title.trim()} campus event`,
      organizer: 'Campus Community',
      spotsRemaining: 50,
      highlights: [
        'Student-led gathering listed via CampVerse',
        'Open Q&A and networking with peers',
      ],
    };

    onSubmitEvent(createdEvent);
    setError('');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
    setError('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171524]/55 backdrop-blur-sm"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="host-event-title"
    >
      <div
        className="w-full max-w-lg rounded-[22px] bg-[#FAF9F6] border border-black/[0.08] shadow-[0_24px_60px_rgba(17,15,28,0.28)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6546E8]">
              Organizers
            </p>
            <h3
              id="host-event-title"
              className="mt-1 font-display text-2xl font-extrabold tracking-tight text-[#171524]"
            >
              Host a Campus Event
            </h3>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close host event form"
            className="w-9 h-9 rounded-full border border-black/[0.08] bg-white flex items-center justify-center text-[#171524] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-11 h-11 text-[#6546E8] mx-auto" aria-hidden="true" />
            <h4 className="font-display text-xl font-bold text-[#171524]">
              Event Published to CampVerse
            </h4>
            <p className="text-sm text-[#5C596B]">
              Your event is now live in the {category} filter and the campus directory.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#6546E8] text-white text-sm font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                {error}
              </p>
            )}

            <div>
              <label
                htmlFor="event-title"
                className="block text-xs font-semibold text-[#171524] mb-1.5"
              >
                Event Title
              </label>
              <input
                id="event-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Autumn Acoustic Night"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.10] text-sm text-[#171524] focus:outline-none focus:border-[#6546E8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="event-date"
                  className="block text-xs font-semibold text-[#171524] mb-1.5"
                >
                  Date
                </label>
                <input
                  id="event-date"
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="12 December 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.10] text-sm text-[#171524] focus:outline-none focus:border-[#6546E8]"
                />
              </div>

              <div>
                <label
                  htmlFor="event-category"
                  className="block text-xs font-semibold text-[#171524] mb-1.5"
                >
                  Category
                </label>
                <select
                  id="event-category"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value as Exclude<EventFilterCategory, 'All Events'>
                    )
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.10] text-sm text-[#171524] focus:outline-none focus:border-[#6546E8]"
                >
                  {HOST_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="event-location"
                className="block text-xs font-semibold text-[#171524] mb-1.5"
              >
                Campus & Venue
              </label>
              <input
                id="event-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Student Union Amphitheatre"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.10] text-sm text-[#171524] focus:outline-none focus:border-[#6546E8]"
              />
            </div>

            <div>
              <label
                htmlFor="event-description"
                className="block text-xs font-semibold text-[#171524] mb-1.5"
              >
                Short Summary
              </label>
              <textarea
                id="event-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share what students will build, learn, or experience..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.10] text-sm text-[#171524] focus:outline-none focus:border-[#6546E8] resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 rounded-full text-sm font-medium text-[#5C596B] hover:text-[#171524] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#6546E8] hover:bg-[#5235CC] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Publish Event
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
