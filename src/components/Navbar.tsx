import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenHostModal: () => void;
  onOpenAllEvents: () => void;
}

export function Navbar({ onOpenHostModal, onOpenAllEvents }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-black/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight text-[#171524] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6546E8] rounded-md"
        >
          Camp<span className="text-[#6546E8]">Verse</span>
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C596B]"
        >
          <a
            href="#trending-events"
            className="hover:text-[#171524] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#6546E8]/50"
          >
            Trending
          </a>
          <button
            type="button"
            onClick={onOpenAllEvents}
            className="hover:text-[#171524] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#6546E8]/50 cursor-pointer"
          >
            All Events
          </button>
          <a
            href="#trending-events"
            className="hover:text-[#171524] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#6546E8]/50"
          >
            Campuses
          </a>
          <a
            href="#footer"
            className="hover:text-[#171524] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#6546E8]/50"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenHostModal}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#6546E8] hover:bg-[#5235CC] rounded-full transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_2px_10px_rgba(101,70,232,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6546E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F6]"
          >
            Host Event
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/[0.08] bg-white text-[#171524] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/[0.06] bg-[#FAF9F6] px-5 py-4 space-y-3">
          <nav className="flex flex-col gap-2 text-sm font-medium text-[#171524]">
            <a
              href="#trending-events"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded-lg hover:bg-black/[0.03]"
            >
              Trending
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAllEvents();
              }}
              className="text-left py-2 px-2 rounded-lg hover:bg-black/[0.03] cursor-pointer"
            >
              All Events
            </button>
            <a
              href="#trending-events"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded-lg hover:bg-black/[0.03]"
            >
              Campuses
            </a>
            <a
              href="#footer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 rounded-lg hover:bg-black/[0.03]"
            >
              About
            </a>
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenHostModal();
            }}
            className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#6546E8] rounded-full cursor-pointer"
          >
            Host Event
          </button>
        </div>
      )}
    </header>
  );
}
