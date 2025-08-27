import { useState } from "react";
import { Heart, MessageCircle, Share, Plus, Bookmark, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface ActionButtonsProps {
  video: Video;
}

export const ActionButtons = ({ video }: ActionButtonsProps) => {
  const [isLiked, setIsLiked] = useState(video.stats.isLiked);
  const [isFollowing, setIsFollowing] = useState(video.user.isFollowing);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(video.stats.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* User Avatar with Follow Button */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
          <img 
            src={video.user.avatar} 
            alt={video.user.username}
            className="w-full h-full object-cover"
          />
        </div>
        {!isFollowing && (
          <Button
            size="sm"
            onClick={handleFollow}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full p-0 follow-button"
          >
            <Plus className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Like Button */}
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLike}
          className={`action-button ${isLiked ? 'like-active' : ''}`}
        >
          <Heart 
            className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`}
            style={isLiked ? { animation: 'heart-beat 0.6s ease-in-out' } : {}}
          />
        </Button>
        <span className="text-xs text-white mt-1 font-medium">
          {formatCount(likes)}
        </span>
      </div>

      {/* Comment Button */}
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="icon"
          className="action-button"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <span className="text-xs text-white mt-1 font-medium">
          {formatCount(video.stats.comments)}
        </span>
      </div>

      {/* Share Button */}
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="icon"
          className="action-button"
        >
          <Share className="w-6 h-6" />
        </Button>
        <span className="text-xs text-white mt-1 font-medium">
          {formatCount(video.stats.shares)}
        </span>
      </div>

      {/* Save Button */}
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className={`action-button ${isSaved ? 'text-accent' : ''}`}
        >
          <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Music Icon (spinning) */}
      <div className="flex flex-col items-center mt-4">
        <Button
          variant="ghost"
          size="icon"
          className="action-button"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center animate-spin-slow">
            <Music className="w-4 h-4 text-white" />
          </div>
        </Button>
      </div>
    </div>
  );
};