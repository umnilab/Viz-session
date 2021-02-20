import { ScatterplotLayer, GeoJsonLayer, PolygonLayer, GridLayer} from 'deck.gl';
import {scaleThreshold} from 'd3-scale';

const COLOR_SCALE = scaleThreshold() // A mapping from value to RGB color
  .domain([2,4,6,8,10,12])
  .range([
    [247, 249, 249],
    [171, 235, 198],
    [249, 231, 159],
    [250, 215, 160],
    [230, 126, 34],
    [211, 84, 0],
    [203, 67, 53]
  ]);

const COLOR_SCALE2 = scaleThreshold() // A mapping from value to RGB color
    .domain([30,40,50,60,70,80])
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
  const { data, data2, onHover, onSelect, settings} = props;
  // Note this is a trick, you can either return false or layers
  return (settings.showMap) && [
    // Put your layer here
      (settings.data == 'poi') && new ScatterplotLayer({
          id:'poi_scatterplot',
          data: data,
          pickable: true,
          opacity: true,
          stroked: true,
          filled: true,
          radiusScale: 6,
          radiusMinPixels: 3,
          radiusMaxPixels: 100,
          lineWidthMinPixels: 1,
          getPosition: d => d.geometry.coordinates,
          getRadius: d=> 1,
          getFillColor: d => COLOR_SCALE(d.properties.facility_t),
          getLineColor: d => [0, 0, 0],
          onHover: onHover,
          onClick: onSelect,
      }),
      (settings.data == 'road') && new GeoJsonLayer({
          id:'road_geojson',
          data: data,
          pickable:true,
          stroked: true,
          filled: false,
          extruded: true,
          lineWidthScale: 20,
          lineWidthMinPixels: 2,
          getLineColor: d => COLOR_SCALE2(d.properties.freeflowsp),
          getRadius: 1,
          getLineWidth:1,
          onHover: onHover,
          onClick: onSelect,
      }),
      (settings.data == 'building') && new PolygonLayer({
          id: 'taxi_buildings',
          data: data,
          pickable:true,
          stroked: true,
          filled: true,
          extruded: true,
          wireframe: false,
          opacity: 0.5,
          lineWidthMinPixels: 1,
          getPolygon: d => d.polygon,
          getElevation: d => d.height,
          getFillColor: [255, 155, 155],
          getLineWidth: 1
      }),
      (settings.data == 'bike') && new GridLayer({
          id: 'bike_grid',
          data: data,
          pickable: true,
          stroked: true,
          extruded: true,
          cellSize: 200,
          elevationScale: 4,
          getPosition: d => [d.start_lon, d.start_lat],
          onHover: onHover,
      }),
      (settings.data == 'covid') && new GeoJsonLayer({
          id: 'zcta_geojson',
          data: data,
          pickable:true,
          stroked: true,
          filled: true,
          extruded: true,
          lineWidthScale: 20,
          lineWidthMinPixels: 2,
          getRadius: 1,
          getLineWidth:1,
          getColor: [155, 155, 155],
          onHover: onHover,
          onClick: onSelect,
      })
  ];
}
