import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Translate from "ol/interaction/Translate";
import { useBaseMap } from "./hooks";

export const BaseMap = () => {
  const { features } = useBaseMap();

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features,
        }),
      });

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: [15100000, 4125000],
          zoom: 12,
        }),
      });

      map.addInteraction(new Translate());
    }
  }, [features]);

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }}></div>;
};
