import { useState } from "react";
import { Search, Navigation, Clock } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const MapSearchBar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const recentSearches = [
    "Central Park, NYC",
    "Times Square",
    "Brooklyn Bridge"
  ];

  const suggestions = [
    "Starbucks near me",
    "Gas stations nearby",
    "Best restaurants",
    "Hotels in Manhattan"
  ];

  return (
    <div className="absolute top-4 left-4 right-4 z-50">
      <div className="relative">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search Google Maps"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              className="pl-10 pr-4 py-3 bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            className="bg-card/95 backdrop-blur-sm border-border/50 shadow-lg"
          >
            <Navigation className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-12 mt-2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-xl p-2">
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Recent
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  onClick={() => {
                    setQuery(search);
                    setShowSuggestions(false);
                  }}
                >
                  {search}
                </button>
              ))}
              <hr className="my-2 border-border/50" />
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex items-center"
                  onClick={() => {
                    setQuery(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  <Search className="w-4 h-4 mr-2 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};