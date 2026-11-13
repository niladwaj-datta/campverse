import heroCampusQuadImg from '../assets/images/hero_campus_quad_1794578607931.jpg';
import codestormHackathonImg from '../assets/images/event_codestorm_hackathon_1794578609037.jpg';
import designMeetupImg from '../assets/images/event_design_meetup_1794578608776.jpg';
import campusCarnivalImg from '../assets/images/event_campus_carnival_1794578609291.jpg';
import techWorkshopImg from '../assets/images/event_tech_workshop_1794578609766.jpg';

export type EventFilterCategory =
  | 'All Events'
  | 'Hackathons'
  | 'Workshops'
  | 'Cultural'
  | 'Tech Talks'
  | 'Design';

export const EVENT_CATEGORIES: EventFilterCategory[] = [
  'All Events',
  'Hackathons',
  'Workshops',
  'Cultural',
  'Tech Talks',
  'Design',
];

export interface CampusEvent {
  id: string;
  badge: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  categoryLabel: string;
  filterCategory: Exclude<EventFilterCategory, 'All Events'>;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  organizer: string;
  spotsRemaining: number;
  featured?: boolean;
  highlights: string[];
}

export const HERO_MEDIA = {
  image: heroCampusQuadImg,
  alt: 'University students collaborating outdoors on sunlit architectural campus steps with laptops and sketchbooks',
};

export const INITIAL_CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: 'codestorm-2026',
    badge: 'FEATURED',
    title: 'CodeStorm 2026',
    description: 'Build, collaborate and bring your boldest ideas to life.',
    date: '22 November 2026',
    time: '09:00 AM – 09:00 PM IST',
    location: 'MSIT Campus, Kolkata',
    categoryLabel: 'Hackathon',
    filterCategory: 'Hackathons',
    ctaLabel: 'Explore Event',
    image: codestormHackathonImg,
    imageAlt: 'University students collaborating around laptops inside a bright campus atrium during CodeStorm 2026 hackathon',
    organizer: 'MSIT Developers Guild',
    spotsRemaining: 42,
    featured: true,
    highlights: [
      '36-hour campus sprint with mentorship from engineering leads',
      'Hardware, AI systems, and civic utility problem tracks',
      'Live product showcase and demo evening in the main atrium',
    ],
  },
  {
    id: 'design-beyond-limits',
    badge: 'DESIGN & CREATIVITY',
    title: 'Design Beyond Limits',
    description:
      'An interactive studio critique and product design meetup exploring typography, motion systems, and tactile digital craft.',
    date: '25 November 2026',
    time: '02:30 PM – 06:00 PM IST',
    location: 'Kolkata',
    categoryLabel: 'Design',
    filterCategory: 'Design',
    ctaLabel: 'View Details',
    image: designMeetupImg,
    imageAlt: 'Students collaborating at a sunlit studio table with UI design layouts and color swatches',
    organizer: 'Pixel & Grid Collective',
    spotsRemaining: 18,
    highlights: [
      'Portfolio teardowns with senior product designers',
      'Hands-on Swiss grid and editorial layout workshop',
      'Collaborative rapid prototyping jam in small teams',
    ],
  },
  {
    id: 'campus-carnival',
    badge: 'CULTURAL',
    title: 'Campus Carnival',
    description:
      'An evening of live indie performances, student choreography, acoustic sets, and campus-wide culinary pop-ups under stage lights.',
    date: '30 November 2026',
    time: '05:30 PM – 10:30 PM IST',
    location: 'College Auditorium',
    categoryLabel: 'Cultural',
    filterCategory: 'Cultural',
    ctaLabel: 'View Details',
    image: campusCarnivalImg,
    imageAlt: 'Vibrant college cultural festival with students performing under golden and violet stage lights',
    organizer: 'Student Cultural Council',
    spotsRemaining: 115,
    highlights: [
      'Live student bands, folk fusion sets, and theatrical showcases',
      'Curated photography walk and courtyard light installations',
      'Open-entry celebration across departments and alumni',
    ],
  },
  {
    id: 'systems-ai-workshop',
    badge: 'WORKSHOP',
    title: 'Applied Systems & AI Lab',
    description:
      'A practical, code-first afternoon building reliable developer tools, evaluation loops, and low-latency interfaces.',
    date: '04 December 2026',
    time: '11:00 AM – 03:30 PM IST',
    location: 'Innovation Studio, Block B',
    categoryLabel: 'Workshop',
    filterCategory: 'Workshops',
    ctaLabel: 'View Details',
    image: techWorkshopImg,
    imageAlt: 'Speaker guiding university students with laptops in a modern timber-paneled tiered studio',
    organizer: 'Campus Builders Lab',
    spotsRemaining: 26,
    highlights: [
      'Bring-your-laptop implementation session with starter repos',
      'Architecture patterns for real-time collaborative apps',
      'Open office hours with student maintainers',
    ],
  },
  {
    id: 'founders-tech-talk',
    badge: 'TECH TALK',
    title: 'Building Products From Dorm Rooms',
    description:
      'Candid conversations with recent graduates who turned campus side-projects into resilient software companies.',
    date: '08 December 2026',
    time: '04:00 PM – 06:00 PM IST',
    location: 'Central Seminar Hall',
    categoryLabel: 'Tech Talk',
    filterCategory: 'Tech Talks',
    ctaLabel: 'View Details',
    image: heroCampusQuadImg,
    imageAlt: 'Students discussing projects outdoors on modern campus steps during golden hour',
    organizer: 'Entrepreneurship Cell',
    spotsRemaining: 64,
    highlights: [
      'Unfiltered Q&A on finding first users on campus',
      'Lessons on shipping fast while balancing coursework',
      'Networking mixer on the courtyard terrace afterward',
    ],
  },
];
