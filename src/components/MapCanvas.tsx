import { MapPin, Car, Fuel, Utensils, Building } from "lucide-react";

interface MapCanvasProps {
  activeLayer: string;
}

export const MapCanvas = ({ activeLayer }: MapCanvasProps) => {
  const pois = [
    { id: 1, type: "restaurant", icon: Utensils, x: "25%", y: "30%", name: "Joe's Pizza", rating: 4.5 },
    { id: 2, type: "gas", icon: Fuel, x: "60%", y: "45%", name: "Shell Station", price: "$3.45" },
    { id: 3, type: "hotel", icon: Building, x: "40%", y: "60%", name: "Grand Hotel", rating: 4.2 },
    { id: 4, type: "restaurant", icon: Utensils, x: "70%", y: "25%", name: "Subway", rating: 3.8 },
    { id: 5, type: "gas", icon: Fuel, x: "30%", y: "70%", name: "BP Station", price: "$3.52" }
  ];

  const getLayerBackground = () => {
    switch (activeLayer) {
      case "satellite":
        return "bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900";
      case "terrain":
        return "bg-gradient-to-br from-amber-100 via-green-200 to-emerald-300";
      default:
        return "bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300";
    }
  };

  const getLayerPattern = () => {
    switch (activeLayer) {
      case "satellite":
        return "opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.3),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.3),transparent_50%)]";
      case "terrain":
        return "opacity-40 bg-[radial-gradient(circle_at_40%_40%,rgba(34,197,94,0.4),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.2),transparent_40%)]";
      default:
        return "opacity-20 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]";
    }
  };

  return (
    <div className={`absolute inset-0 ${getLayerBackground()} transition-all duration-500`}>
      {/* Street Grid Pattern */}
      <div className={`absolute inset-0 ${getLayerPattern()}`} />
      
      {/* Traffic Route Overlay */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Main route */}
        <path
          d="M 50 100 Q 150 200 300 300 Q 500 400 700 350"
          stroke="#3B82F6"
          strokeWidth="6"
          fill="none"
          strokeDasharray="0"
          className="animate-pulse"
        />
        
        {/* Traffic indicators */}
        <path
          d="M 200 250 Q 300 280 400 270"
          stroke="#EF4444"
          strokeWidth="4"
          fill="none"
          strokeDasharray="8,4"
          className="opacity-80"
        />
        
        <path
          d="M 450 320 Q 550 330 650 325"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
        />
      </svg>

      {/* POI Markers */}
      {pois.map((poi) => {
        const IconComponent = poi.icon;
        return (
          <div
            key={poi.id}
            className="absolute group cursor-pointer animate-bounce-gentle"
            style={{ left: poi.x, top: poi.y, animationDelay: `${poi.id * 0.2}s` }}
          >
            {/* Pin */}
            <div className="relative">
              <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" />
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                <IconComponent className="w-4 h-4 text-white" />
              </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-xl p-2 text-xs whitespace-nowrap">
                <div className="font-medium">{poi.name}</div>
                {poi.rating && (
                  <div className="text-yellow-500">★ {poi.rating}</div>
                )}
                {poi.price && (
                  <div className="text-green-600">{poi.price}/gal</div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Current Location */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
          <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75" />
        </div>
      </div>

      {/* Buildings/Landmarks (only in map view) */}
      {activeLayer === "map" && (
        <>
          <div className="absolute top-1/4 left-1/3 w-12 h-16 bg-gray-400 rounded-t-lg shadow-lg opacity-60" />
          <div className="absolute top-1/3 right-1/4 w-8 h-12 bg-gray-500 rounded-t-lg shadow-lg opacity-60" />
          <div className="absolute bottom-1/3 left-1/4 w-10 h-14 bg-gray-600 rounded-t-lg shadow-lg opacity-60" />
        </>
      )}

      {/* Street Labels */}
      <div className="absolute top-1/4 left-10 text-xs font-medium text-gray-600 rotate-45 select-none">
        Broadway
      </div>
      <div className="absolute top-1/2 right-20 text-xs font-medium text-gray-600 -rotate-12 select-none">
        5th Avenue
      </div>
      <div className="absolute bottom-1/3 left-1/2 text-xs font-medium text-gray-600 rotate-12 select-none">
        42nd Street
      </div>
    </div>
  );
};