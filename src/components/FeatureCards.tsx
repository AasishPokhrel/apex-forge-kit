import { X, Sparkles, TreePine, Building, Bus, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface FeatureCardsProps {
  onClose: () => void;
}

export const FeatureCards = ({ onClose }: FeatureCardsProps) => {
  const features = [
    {
      id: 1,
      title: "Immersive View",
      description: "See your destination in stunning 3D before you arrive",
      icon: Eye,
      color: "from-blue-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=120&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Live Transit",
      description: "Real-time public transport tracking and updates",
      icon: Bus,
      color: "from-green-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=120&fit=crop&crop=center"
    }
  ];

  return (
    <div className="absolute top-20 right-20 w-72 z-40 space-y-3">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <Card 
            key={feature.id} 
            className="bg-card/95 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-24 overflow-hidden">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-80`} />
              <div className="absolute top-2 right-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="h-6 w-6 text-white hover:bg-white/20"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <div className="absolute bottom-2 left-3 flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <IconComponent className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-medium text-sm">{feature.title}</span>
              </div>
            </div>
            
            <div className="p-3">
              <p className="text-xs text-muted-foreground mb-3">
                {feature.description}
              </p>
              <Button 
                size="sm" 
                className="w-full h-8 text-xs bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              >
                Try Now
              </Button>
            </div>
          </Card>
        );
      })}

      {/* AI Enhancement Badge */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm p-3">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="font-medium text-sm">AI-Enhanced</span>
        </div>
        <p className="text-xs text-muted-foreground">
          All features powered by advanced AI for smarter navigation
        </p>
      </Card>
    </div>
  );
};