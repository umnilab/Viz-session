import { ScatterplotLayer, GeoJsonLayer, ArcLayer } from 'deck.gl';
import {scaleThreshold} from 'd3-scale';

const COLOR_SCALE = scaleThreshold() // A mapping from value to RGB color
  .domain([0,100,200,500,1000,5000])
  .range([
    [247, 249, 249],
    [171, 235, 198],
    [249, 231, 159],
    [250, 215, 160],
    [230, 126, 34],
    [211, 84, 0],
    [203, 67, 53]
  ]);

const LIGHT_SETTINGS = { // Changing the light setting if necessary
  lightsPosition: [-73.8, 40.5, 8000, -74.2, 40.9, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

export function renderLayers(props) {
  const { data, onHover, onSelect, settings} = props;
  // Note this is a trick, you can either return false or layers
  return (settings.show) && [
    // Put your layer here
  ];
}
