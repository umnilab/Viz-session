// A template for creating Deck-GL based simulation
// Author: Zengxiang Lei

/* global window */
import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import {LAYER_CONTROLS, LayerControls, MapStylePicker} from './controls';
import DeckGL from 'deck.gl';
import { renderLayers } from './deckgl-layers';
import { tooltipStyle } from './style';

const INITIAL_VIEW_STATE = {
  longitude: -73.95,
  latitude: 40.7,
  zoom: 10.3,
  minZoom: 5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

export default class App extends Component {
  state = {
    hoveredObject: null,
    selectedObject: null,
    data: null,
    settings: Object.keys(LAYER_CONTROLS).reduce(
      (accu, key) => ({
        ...accu,
        [key]: LAYER_CONTROLS[key].value
      }),
      {}
    ),
    style: 'mapbox://styles/mapbox/outdoors-v10' // Style for mapbox
  };

  // When open the link
  componentDidMount() {
    this._processData();
  }

  // Process the data
  _processData = () => {
    let data = null;
    // Update the state
    this.setState({data: data},()=>{console.log(data)})
  };

  // Data processing for customized interaction
  _recalculateData = () => {
    let data = null;
    // Update the state
    this.setState({data: data},()=>{console.log(data)})
  }

  // When hover an object
  _onHover({x, y, object}) {
    this.setState({x, y, hoveredObject: object});
  }

  // When select an object
  _onSelect({object}){
    this.setState({selectedObject: object === this.state.selectedObject ? null : object
    });
  }

  // When change the map style
  _onStyleChange = style => {
    this.setState({ style });
  };

  // When the settings in the control panel are changed
  _updateLayerSettings(settings) {
    if(settings != this.state.settings){
      this.setState({ settings }, () => {
        this._recalculateData();
      });
    }
  }

  // Render a bulletin for displaying the hovered information
  _renderTooltip() {
    const {x, y, hoveredObject} = this.state;
    return (
        // if hoveredObject is null, then the rest part won't be execute
        hoveredObject && (
            <div className="tooltip" style={{top: y, left: x, tooltipStyle}}>
              <div> Hovered object: {hoveredObject} </div>
            </div>
        )
    );
  }

  // For correctly loading WebGL layer with the GIS (supported by Mapbox) layer
  _onWebGLInitialize = gl => {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  };

  // Rendering the webpage
  render() {
    const { viewState, controller = true } = this.props;
    return (
      <div>
        <MapStylePicker
            onStyleChange={this._onStyleChange}
            currentStyle={this.state.style}
        />
        <LayerControls
          settings={this.state.settings}
          propTypes={LAYER_CONTROLS}
          onChange={settings => this._updateLayerSettings(settings)}
        />
        <DeckGL
          onWebGLInitialized={this._onWebGLInitialize}
          layers={renderLayers({
            data: this.state.data,
            onHover: this._onHover,
            onSelect: this._onSelect,
            settings: this.state.settings
          })}
          initialViewState={INITIAL_VIEW_STATE}
          viewState={viewState}
          controller={controller}
        >
          <StaticMap mapStyle={this.state.style} />
          {this._renderTooltip}
        </DeckGL>
      </div>
    );
  }
}
