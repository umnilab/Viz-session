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
    pitch: 30,
    bearing: 0
};

// Source data URL
const DATA_URL = {
    ROADS:'https://raw.githubusercontent.com/umnilab/Viz-session/main/Session%202/1_examples/data/road.json',
    BUILDINGS: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json',
    BIKES:'https://raw.githubusercontent.com/umnilab/Viz-session/main/Session%202/1_examples/data/bike.json',
    TAXIS: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json',
    ZCTA: 'https://raw.githubusercontent.com/umnilab/Viz-session/main/Session%202/1_examples/data/nyc_zips.json',
    POI: 'https://raw.githubusercontent.com/umnilab/Viz-session/main/Session%202/1_examples/data/poi.json'
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
        style: 'mapbox://styles/mapbox/light-v9', // Style for mapbox
    };

    // When open the link
    componentDidMount() {
        this._processData();
    }

    // Process the data
    _processData = () => {
        let data = null;
        // Update the state
        switch(this.state.settings.data){
            case 'poi':
                data = DATA_URL.POI;
                break;
            case 'road':
                data = DATA_URL.ROADS;
                break;
            case 'building':
                data = DATA_URL.BUILDINGS;
                break;
            case 'bike':
                data = DATA_URL.BIKES;
                break;
            case 'covid':
                data = DATA_URL.ZCTA;
        }
        this.setState({data: data}, ()=>{console.log(data)})
    };

    // Data processing for customized interaction
    _recalculateData = () => {
        let data = null;
        // Update the state
        switch(this.state.settings.data){
            case 'poi':
                data = DATA_URL.POI;
                break;
            case 'road':
                data = DATA_URL.ROADS;
                break;
            case 'building':
                data = DATA_URL.BUILDINGS;
                break;
            case 'bike':
                data = DATA_URL.BIKES;
                break;
            case 'covid':
                data = DATA_URL.ZCTA;
        }
        this.setState({data: data}, ()=>{console.log(data)})
    }

    // When hover an object
    _onHover({x, y, object}) {
        this.setState({x, y, hoveredObject: object});
    }

    _onHover = this._onHover.bind(this);

    // When select an object
    _onSelect({object}){
        // console.log(object);
        this.setState({selectedObject: object === this.state.selectedObject ? null : object
        });
    }

    _onSelect = this._onSelect.bind(this);

    // When change the map style
    _onStyleChange = style => {
        this.setState({ style });
    };

    // When the settings in the control panel are changed
    _updateLayerSettings(settings) {
        if (settings != this.state.settings) {
            this.setState({settings}, () => {
                this._recalculateData();
            });
        }
    }

    // Render a bulletin for displaying the hovered information
    _renderTooltip() {
        const {x, y, settings, hoveredObject} = this.state;
        switch(settings.data){
            case 'poi':
                return (
                    // if hoveredObject is null, then the rest part won't be execute
                    hoveredObject && (
                        <div className="tooltip" style={{top: y, left: x, tooltipStyle}}>
                            <div> Hovered object: {hoveredObject.properties.name} </div>
                        </div>
                    )
                );
                break;
            case 'road':
                return (
                    // if hoveredObject is null, then the rest part won't be execute
                    hoveredObject && (
                        <div className="tooltip" style={{top: y, left: x, tooltipStyle}}>
                            <div> Hovered object: {hoveredObject.properties.Id} </div>
                        </div>
                    )
                );
                break;
            case 'buildings':
                return (
                    // if hoveredObject is null, then the rest part won't be execute
                    hoveredObject && (
                        <div className="tooltip" style={{top: y, left: x, tooltipStyle}}>
                            <div> Hovered object: {hoveredObject.height} </div>
                        </div>
                    )
                );
            case 'bike':
                return (
                    // if hoveredObject is null, then the rest part won't be execute
                    hoveredObject && (
                        <div className="tooltip" style={{top: y, left: x, tooltipStyle}}>
                            <div> Hovered object: {hoveredObject.elevationValue} </div>
                        </div>
                    )
                );
        }

    }

    _renderTooltip = this._renderTooltip.bind(this);

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
