import { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Translate from "ol/interaction/Translate";
import Select from "ol/interaction/Select";
import DragBox from "ol/interaction/DragBox";
import { shiftKeyOnly, platformModifierKeyOnly } from "ol/events/condition";
import { Polygon } from "ol/geom";
import { Feature } from "ol";

import { useBaseMap } from "./hooks";
import "./styles.css";

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

      const select = new Select({
        layers: [vectorLayer],
        toggleCondition: shiftKeyOnly,
      });

      const translate = new Translate({
        features: select.getFeatures(),
        hitTolerance: 1000,
      });

      const dragBox = new DragBox({
        condition: platformModifierKeyOnly,
        className: "my-drag-box",
      });

      map.addInteraction(select);
      map.addInteraction(translate);
      map.addInteraction(dragBox);

      dragBox.on("boxend", () => {
        const extent = dragBox.getGeometry().getExtent();
        vectorLayer
          .getSource()
          ?.forEachFeatureIntersectingExtent(extent, (feature) => {
            select.getFeatures().push(feature);
          });
      });

      dragBox.on("boxstart", function () {
        select.getFeatures().clear();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Delete") {
          const selectedFeatures = select.getFeatures();
          selectedFeatures.forEach((feature) => {
            vectorLayer.getSource()?.removeFeature(feature as Feature<Polygon>);
          });
          selectedFeatures.clear();
        }
      });
    }
  }, [features]);

  return <div ref={mapRef} className="root"></div>;
};
