/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AllEventsModal } from './components/AllEventsModal';
import { EventDetailModal } from './components/EventDetailModal';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { HostEventModal } from './components/HostEventModal';
import { Navbar } from './components/Navbar';
import { TrendingEventsSection } from './components/TrendingEventsSection';
import {
  CampusEvent,
  EventFilterCategory,
  INITIAL_CAMPUS_EVENTS,
} from './data/events';

export default function App() {
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_CAMPUS_EVENTS);
  const [activeCategory, setActiveCategory] =
    useState<EventFilterCategory>('All Events');
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [allEventsOpen, setAllEventsOpen] = useState(false);
  const [hostModalOpen, setHostModalOpen] = useState(false);
  const [rsvpedIds, setRsvpedIds] = useState<Record<string, boolean>>({});

  const handleToggleRsvp = (eventId: string) => {
    setRsvpedIds((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const handleAddEvent = (newEvent: CampusEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setActiveCategory(newEvent.filterCategory);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#171524]">
      <Navbar
        onOpenHostModal={() => setHostModalOpen(true)}
        onOpenAllEvents={() => setAllEventsOpen(true)}
      />

      <main className="flex-1">
        <HeroSection onOpenHostModal={() => setHostModalOpen(true)} />

        <TrendingEventsSection
          events={events}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectEvent={setSelectedEvent}
          onExploreAll={() => setAllEventsOpen(true)}
        />
      </main>

      <Footer
        onOpenHostModal={() => setHostModalOpen(true)}
        onOpenAllEvents={() => setAllEventsOpen(true)}
      />

      <EventDetailModal
        event={selectedEvent}
        isRsvped={selectedEvent ? Boolean(rsvpedIds[selectedEvent.id]) : false}
        onToggleRsvp={handleToggleRsvp}
        onClose={() => setSelectedEvent(null)}
      />

      <AllEventsModal
        open={allEventsOpen}
        events={events}
        onSelectEvent={setSelectedEvent}
        onClose={() => setAllEventsOpen(false)}
      />

      <HostEventModal
        open={hostModalOpen}
        onClose={() => setHostModalOpen(false)}
        onSubmitEvent={handleAddEvent}
      />
    </div>
  );
}
