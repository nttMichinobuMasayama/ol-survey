import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";

export const useBaseMap = () => {
  const square1 = new Feature({
    geometry: new Polygon([
      [
        [15090000, 4130000],
        [15095000, 4130000],
        [15095000, 4125000],
        [15090000, 4125000],
      ],
    ]),
  });

  const square2 = new Feature({
    geometry: new Polygon([
      [
        [15100000, 4130000],
        [15105000, 4130000],
        [15105000, 4125000],
        [15100000, 4125000],
      ],
    ]),
  });

  const square3 = new Feature({
    geometry: new Polygon([
      [
        [15110000, 4130000],
        [15115000, 4130000],
        [15115000, 4125000],
        [15110000, 4125000],
      ],
    ]),
  });

  return { features: [square1, square2, square3] };
};
