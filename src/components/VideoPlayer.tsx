import { useState, useRef, useEffect } from "react";
import { ActionButtons } from "./ActionButtons";
import { VideoInfo } from "./VideoInfo";

interface Video {
  id: string;
  url: string;
  thumbnail: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    isFollowing: boolean;
  };
  caption: string;
  hashtags: string[];
  music: {
    title: string;
    artist: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
  };
}

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onVideoEnd: () => void;
}

export const VideoPlayer = ({ video, isActive, onVideoEnd }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isActive) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
    } else {
      videoElement.play();
      setIsPlaying(true);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
    setShowControls(true);
    
    // Hide controls after 3 seconds
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    onVideoEnd();
  };

  return (
    <div className="video-container relative bg-black">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={video.url}
        poster={video.thumbnail}
        loop
        muted
        playsInline
        onClick={handleVideoClick}
        onEnded={handleVideoEnd}
        preload="metadata"
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 video-overlay pointer-events-none" />

      {/* Play/Pause indicator */}
      {showControls && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-20 h-20 rounded-full glass-effect flex items-center justify-center transition-all duration-300 ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
            <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
          </div>
        </div>
      )}

      {/* Right side action buttons */}
      <div className="absolute right-4 bottom-24 z-10">
        <ActionButtons video={video} />
      </div>

      {/* Bottom info section */}
      <div className="absolute bottom-0 left-0 right-16 p-4 z-10">
        <VideoInfo video={video} />
      </div>
    </div>
  );
};