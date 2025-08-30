import { useState } from "react";
import { ZoomIn, ZoomOut, Locate, Layers, Map, Satellite, Mountain, Compass, View } from "lucide-react";
import { Button } from "./ui/button";

interface MapControlsProps {
  activeLayer: string;
  onLayerChange: (layer: string) => void;
}

export const MapControls = ({ activeLayer, onLayerChange }: MapControlsProps) => {
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [is3DEnabled, setIs3DEnabled] = useState(false);

  const layers = [
    { id: "map", name: "Map", icon: Map },
    { id: "satellite", name: "Satellite", icon: Satellite },
    { id: "terrain", name: "Terrain", icon: Mountain }
  ];

  return (
    <>
      {/* Right Side Controls */}
      <div className="absolute right-4 top-20 z-40 space-y-2">
        {/* Layer Toggle */}
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="bg-card/95 backdrop-blur-sm border-border/50 shadow-lg"
          >
            <Layers className="w-5 h-5" />
          </Button>
          
          {showLayerMenu && (
            <div className="absolute top-full right-0 mt-2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-xl p-2 min-w-32">
              {layers.map((layer) => {
                const IconComponent = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      onLayerChange(layer.id);
                      setShowLayerMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex items-center ${
                      activeLayer === layer.id ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {layer.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3D View Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIs3DEnabled(!is3DEnabled)}
          className={`bg-card/95 backdrop-blur-sm border-border/50 shadow-lg ${
            is3DEnabled ? 'bg-primary text-primary-foreground' : ''
          }`}
        >
          <View className="w-5 h-5" />
        </Button>

        {/* Compass */}
        <Button
          variant="outline"
          size="icon"
          className="bg-card/95 backdrop-blur-sm border-border/50 shadow-lg"
        >
          <Compass className="w-5 h-5" />
        </Button>
      </div>

      {/* Bottom Right Controls */}
      <div className="absolute right-4 bottom-20 z-40 space-y-2">
        {/* Current Location */}
        <Button
          variant="outline"
          size="icon"
          className="bg-card/95 backdrop-blur-sm border-border/50 shadow-lg"
        >
          <Locate className="w-5 h-5" />
        </Button>

        {/* Zoom Controls */}
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-b-none border-b border-border/50"
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-t-none"
          >
            <ZoomOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};