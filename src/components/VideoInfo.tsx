import { Music } from "lucide-react";

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

interface VideoInfoProps {
  video: Video;
}

export const VideoInfo = ({ video }: VideoInfoProps) => {
  return (
    <div className="text-white space-y-3">
      {/* Username */}
      <div className="flex items-center space-x-2">
        <h3 className="font-semibold text-lg">@{video.user.username}</h3>
      </div>

      {/* Caption and Hashtags */}
      <div className="space-y-1">
        <p className="text-sm leading-relaxed">
          {video.caption}
        </p>
        <div className="flex flex-wrap gap-1">
          {video.hashtags.map((hashtag, index) => (
            <span 
              key={index}
              className="text-sm text-accent font-medium hover:underline cursor-pointer"
            >
              {hashtag}
            </span>
          ))}
        </div>
      </div>

      {/* Music Info */}
      <div className="flex items-center space-x-2 glass-effect rounded-full px-3 py-2 max-w-fit">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center animate-spin-slow">
          <Music className="w-2 h-2 text-white" />
        </div>
        <div className="text-xs text-white/90 truncate max-w-48">
          <span className="font-medium">{video.music.artist}</span>
          <span className="mx-1">•</span>
          <span>{video.music.title}</span>
        </div>
      </div>
    </div>
  );
};