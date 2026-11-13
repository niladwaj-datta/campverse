import { useState } from 'react';
import { Camera } from 'lucide-react';

interface EventImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function EventImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: EventImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFEBFD] via-[#F5F3FA] to-[#E6E0F8] text-[#6546E8] p-6 ${className}`}
      >
        <Camera className="w-7 h-7 mb-2 opacity-70" aria-hidden="true" />
        {fallbackTitle && (
          <span className="font-display text-sm font-semibold text-[#171524]/70 text-center">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
