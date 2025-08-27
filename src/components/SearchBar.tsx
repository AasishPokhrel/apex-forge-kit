import { useState } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClose: () => void;
}

export const SearchBar = ({ onSearch, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const trendingHashtags = [
    "#coding", "#webdev", "#react", "#creative", "#design", 
    "#art", "#tech", "#programming", "#inspiration", "#innovation"
  ];

  const handleSearch = (searchQuery: string) => {
    onSearch(searchQuery);
    setQuery(searchQuery);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="flex items-center space-x-4 p-4 border-b border-border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search videos, users, sounds..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
            className="pl-10 pr-4 py-3 bg-muted border-none text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-foreground"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Recent searches would go here */}
        {query.length === 0 && (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Trending Hashtags
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {trendingHashtags.map((hashtag, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 text-left"
                    onClick={() => handleSearch(hashtag)}
                  >
                    <span className="text-accent font-semibold">{hashtag}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Suggested Creators</h3>
              <div className="space-y-3">
                {[
                  { username: "creativecoder", followers: "125K", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" },
                  { username: "designmaven", followers: "89K", avatar: "https://images.unsplash.com/photo-1494790108755-2616b25d11cf?w=100&h=100&fit=crop&crop=face" },
                  { username: "techguru", followers: "156K", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }
                ].map((creator, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2">
                    <img 
                      src={creator.avatar} 
                      alt={creator.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">@{creator.username}</p>
                      <p className="text-sm text-muted-foreground">{creator.followers} followers</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Search results would be displayed here when query has content */}
        {query.length > 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Search results for "{query}" would appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};