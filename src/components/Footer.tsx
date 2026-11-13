interface FooterProps {
  onOpenHostModal: () => void;
  onOpenAllEvents: () => void;
}

export function Footer({ onOpenHostModal, onOpenAllEvents }: FooterProps) {
  return (
    <footer
      id="footer"
      className="border-t border-black/[0.06] bg-[#FAF9F6] py-10 sm:py-12"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="font-display text-lg font-extrabold tracking-tight text-[#171524]">
            Camp<span className="text-[#6546E8]">Verse</span>
          </span>
          <p className="mt-1 text-xs text-[#5C596B]">
            Curated student hackathons, design meetups, and campus festivals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[#5C596B]">
          <a href="#trending-events" className="hover:text-[#171524] transition-colors">
            Trending Events
          </a>
          <button
            type="button"
            onClick={onOpenAllEvents}
            className="hover:text-[#171524] transition-colors cursor-pointer"
          >
            Directory
          </button>
          <button
            type="button"
            onClick={onOpenHostModal}
            className="hover:text-[#171524] transition-colors cursor-pointer"
          >
            Host an Event
          </button>
          <span className="text-xs text-[#5C596B]/80">
            © 2026 CampVerse
          </span>
        </div>
      </div>
    </footer>
  );
}
