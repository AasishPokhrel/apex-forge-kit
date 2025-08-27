import { useState, useEffect, useRef } from "react";
import { VideoPlayer } from "./VideoPlayer";

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

// Mock data for now - will be replaced with Supabase data
const mockVideos: Video[] = [
  {
    id: "1",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=700&fit=crop",
    user: {
      id: "user1",
      username: "creativecoder",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      isFollowing: false
    },
    caption: "Building the future with code! 🚀✨",
    hashtags: ["#coding", "#webdev", "#react", "#creative"],
    music: {
      title: "Future Bass",
      artist: "TechBeats"
    },
    stats: {
      likes: 2500,
      comments: 150,
      shares: 89,
      isLiked: false
    }
  },
  {
    id: "2", 
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=700&fit=crop",
    user: {
      id: "user2",
      username: "designmaven",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b25d11cf?w=100&h=100&fit=crop&crop=face",
      isFollowing: true
    },
    caption: "When creativity meets technology ✨🎨",
    hashtags: ["#design", "#art", "#creative", "#inspiration"],
    music: {
      title: "Creative Flow",
      artist: "ArtisticVibes"
    },
    stats: {
      likes: 4200,
      comments: 320,
      shares: 156,
      isLiked: true
    }
  },
  {
    id: "3",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", 
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=700&fit=crop",
    user: {
      id: "user3",
      username: "techguru",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      isFollowing: false
    },
    caption: "The power of modern web development! 🔥💻",
    hashtags: ["#tech", "#programming", "#innovation", "#future"],
    music: {
      title: "Digital Dreams",
      artist: "CyberSound"
    },
    stats: {
      likes: 1800,
      comments: 95,
      shares: 47,
      isLiked: false
    }
  }
];

export const VideoFeed = () => {
  const [videos] = useState<Video[]>(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentVideoIndex, videos.length]);

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-scroll scroll-snap-container scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {videos.map((video, index) => (
        <div key={video.id} className="scroll-snap-item">
          <VideoPlayer 
            video={video}
            isActive={index === currentVideoIndex}
            onVideoEnd={() => {
              // Auto-scroll to next video
              if (index < videos.length - 1) {
                const container = containerRef.current;
                if (container) {
                  container.scrollTo({
                    top: (index + 1) * window.innerHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};