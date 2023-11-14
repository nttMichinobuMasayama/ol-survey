import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
import OSM from "ol/source/OSM";

export const BaseMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const squareFeature1 = new Feature({
        geometry: new Polygon([
          [
            [15090000, 4130000],
            [15095000, 4130000],
            [15095000, 4125000],
            [15090000, 4125000],
          ],
        ]),
      });

      const squareFeature2 = new Feature({
        geometry: new Polygon([
          [
            [15100000, 4130000],
            [15105000, 4130000],
            [15105000, 4125000],
            [15100000, 4125000],
          ],
        ]),
      });

      const squareFeature3 = new Feature({
        geometry: new Polygon([
          [
            [15110000, 4130000],
            [15115000, 4130000],
            [15115000, 4125000],
            [15110000, 4125000],
          ],
        ]),
      });

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [squareFeature1, squareFeature2, squareFeature3],
        }),
      });

      new Map({
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
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }}></div>;
};
