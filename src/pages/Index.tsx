import { useState } from "react";
import { VideoFeed } from "@/components/VideoFeed";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // TODO: Implement search functionality with Supabase
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <VideoFeed />;
      case "discover":
        return (
          <div className="h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🔥</span>
              </div>
              <h2 className="text-2xl font-bold gradient-text">Discover</h2>
              <p className="text-muted-foreground">Find trending videos, popular creators, and discover new content tailored just for you</p>
              <div className="flex space-x-2 mt-6">
                <button 
                  onClick={() => setShowSearch(true)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </div>
        );
      case "upload":
        return (
          <div className="h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">📹</span>
              </div>
              <h2 className="text-2xl font-bold gradient-text">Create & Upload</h2>
              <p className="text-muted-foreground">Share your creativity with the world. Upload videos, add effects, and connect with your audience</p>
              <div className="space-y-3 mt-6">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium">
                  Record Video
                </button>
                <button className="w-full px-4 py-3 border border-border rounded-full font-medium">
                  Upload from Gallery
                </button>
              </div>
            </div>
          </div>
        );
      case "activity":
        return (
          <div className="h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-destructive to-primary rounded-full flex items-center justify-center mb-6 animate-heart-beat">
                <span className="text-2xl">❤️</span>
              </div>
              <h2 className="text-2xl font-bold gradient-text">Activity</h2>
              <p className="text-muted-foreground">See who liked your videos, followed you, and commented on your content</p>
              <div className="text-sm text-muted-foreground mt-4">
                Sign in to see your activity feed
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold gradient-text">Your Profile</h2>
              <p className="text-muted-foreground">Manage your account, view your videos, and customize your profile</p>
              <div className="space-y-3 mt-6">
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium">
                  Sign In
                </button>
                <button className="px-6 py-2 border border-border rounded-full font-medium">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <VideoFeed />;
    }
  };

  if (showSearch) {
    return (
      <SearchBar 
        onSearch={handleSearch}
        onClose={() => setShowSearch(false)}
      />
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Main content */}
      <main className="h-full pb-16">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          if (tab === "discover") {
            setShowSearch(false);
          }
          setActiveTab(tab);
        }} 
      />
    </div>
  );
};

export default Index;
