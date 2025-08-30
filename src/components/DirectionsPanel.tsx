import { X, Navigation, Clock, Route, Zap, Leaf, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface DirectionsPanelProps {
  onClose: () => void;
}

export const DirectionsPanel = ({ onClose }: DirectionsPanelProps) => {
  const routes = [
    {
      id: 1,
      name: "Fastest route",
      duration: "18 min",
      distance: "7.2 km",
      description: "via FDR Dr",
      traffic: "moderate",
      isRecommended: true,
      icon: Zap,
      iconColor: "text-blue-500"
    },
    {
      id: 2,
      name: "Eco-friendly",
      duration: "22 min",
      distance: "6.8 km",
      description: "Less fuel consumption",
      traffic: "light",
      isEco: true,
      icon: Leaf,
      iconColor: "text-green-500"
    },
    {
      id: 3,
      name: "Avoid tolls",
      duration: "25 min",
      distance: "8.1 km",
      description: "via Manhattan Bridge",
      traffic: "heavy",
      icon: Route,
      iconColor: "text-orange-500"
    }
  ];

  const steps = [
    "Head north on Broadway toward W 42nd St",
    "Turn right onto W 42nd St",
    "Continue straight for 0.5 mi",
    "Turn left onto 8th Ave",
    "Arrive at destination on the right"
  ];

  return (
    <div className="absolute left-4 top-20 bottom-4 w-80 z-40">
      <Card className="h-full bg-card/95 backdrop-blur-sm border-border/50 shadow-xl p-4 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Directions</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Route Options */}
        <div className="space-y-2 mb-4">
          {routes.map((route) => {
            const IconComponent = route.icon;
            return (
              <button
                key={route.id}
                className={`w-full p-3 rounded-lg border transition-all hover:bg-accent/50 text-left ${
                  route.isRecommended 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`w-4 h-4 ${route.iconColor}`} />
                    <span className="font-medium text-sm">{route.name}</span>
                    {route.isRecommended && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        Best
                      </span>
                    )}
                    {route.isEco && (
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                        Eco
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{route.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{route.distance} • {route.description}</span>
                  <div className="flex items-center space-x-1">
                    {route.traffic === 'heavy' && <AlertTriangle className="w-3 h-3 text-red-500" />}
                    <span className={`
                      ${route.traffic === 'light' ? 'text-green-500' : ''}
                      ${route.traffic === 'moderate' ? 'text-yellow-500' : ''}
                      ${route.traffic === 'heavy' ? 'text-red-500' : ''}
                    `}>
                      {route.traffic} traffic
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* AI Optimization Banner */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-sm">AI-Optimized Route</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Considering real-time traffic, weather, and your preferences
          </p>
        </div>

        {/* Step-by-step directions */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="font-medium text-sm mb-3 flex items-center">
            <Route className="w-4 h-4 mr-2 text-primary" />
            Step-by-step directions
          </h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm text-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Start Navigation Button */}
        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
          <Navigation className="w-4 h-4 mr-2" />
          Start Navigation
        </Button>
      </Card>
    </div>
  );
};