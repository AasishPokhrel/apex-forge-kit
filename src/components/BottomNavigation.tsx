import { Home, Search, Plus, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "discover", icon: Search, label: "Discover" },
    { id: "upload", icon: Plus, label: "Upload" },
    { id: "activity", icon: Heart, label: "Activity" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-white/10">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isUpload = item.id === "upload";
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 h-auto transition-all duration-200 ${
                isUpload 
                  ? "bg-gradient-to-r from-primary to-secondary text-white rounded-xl px-4 py-2 hover:scale-105" 
                  : isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`${isUpload ? "w-5 h-5" : "w-5 h-5"}`} />
              <span className={`text-xs font-medium ${isUpload ? "hidden" : ""}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};