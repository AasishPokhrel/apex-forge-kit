import { useState } from "react";
import { MapSearchBar } from "./MapSearchBar";
import { MapControls } from "./MapControls";
import { DirectionsPanel } from "./DirectionsPanel";
import { MapCanvas } from "./MapCanvas";
import { FeatureCards } from "./FeatureCards";

export const MapInterface = () => {
  const [showDirections, setShowDirections] = useState(true);
  const [activeLayer, setActiveLayer] = useState("map");
  const [showFeatures, setShowFeatures] = useState(true);

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Search Bar */}
      <MapSearchBar />
      
      {/* Map Controls */}
      <MapControls 
        activeLayer={activeLayer}
        onLayerChange={setActiveLayer}
      />
      
      {/* Directions Panel */}
      {showDirections && (
        <DirectionsPanel onClose={() => setShowDirections(false)} />
      )}
      
      {/* Feature Cards */}
      {showFeatures && (
        <FeatureCards onClose={() => setShowFeatures(false)} />
      )}
      
      {/* Main Map Canvas */}
      <MapCanvas activeLayer={activeLayer} />
    </div>
  );
};