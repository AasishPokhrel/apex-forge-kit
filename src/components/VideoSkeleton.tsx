export const VideoSkeleton = () => {
  return (
    <div className="video-container bg-muted animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-muted-foreground/20" />
      
      {/* Right side action buttons skeleton */}
      <div className="absolute right-4 bottom-24 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-12 h-12 rounded-full bg-muted-foreground/20" />
        ))}
      </div>

      {/* Bottom info skeleton */}
      <div className="absolute bottom-4 left-4 right-16 space-y-3">
        <div className="h-5 bg-muted-foreground/20 rounded w-32" />
        <div className="h-4 bg-muted-foreground/20 rounded w-48" />
        <div className="h-4 bg-muted-foreground/20 rounded w-24" />
        <div className="flex space-x-2">
          <div className="h-6 bg-muted-foreground/20 rounded-full w-16" />
          <div className="h-6 bg-muted-foreground/20 rounded-full w-20" />
        </div>
      </div>

      {/* Center play button skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-muted-foreground/20" />
      </div>
    </div>
  );
};