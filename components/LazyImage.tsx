import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-charcoal/5 ${wrapperClassName} w-full h-full`}>
      {/* Loading shimmer/pulse skeleton */}
      {!isLoaded && (
        <div 
          className="absolute inset-x-0 inset-y-0 w-full h-full transition-opacity duration-500 bg-charcoal/5"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(46,46,46,0.03) 25%, rgba(46,46,46,0.08) 50%, rgba(46,46,46,0.03) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite linear',
          }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
          isLoaded 
            ? 'opacity-100 blur-0 scale-100' 
            : 'opacity-0 blur-sm scale-105'
        } ${className}`}
        referrerPolicy="no-referrer"
        loading={loading}
        {...props}
      />
      
      {/* Add inline shimmer keyframes style tag only once, or we can use tailwind animation style */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default LazyImage;
