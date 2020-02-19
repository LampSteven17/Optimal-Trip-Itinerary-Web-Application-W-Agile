import React, {Component} from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  Row
} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Geolocation from '@react-native-community/geolocation';

const FALSECOLOR = "5px solid red";
const TRUECOLOR =  "5px solid green";
const Coordinates = require('coordinate-parser');
const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [0, 0];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_STYLE_LENGTH = 500;
const MAP_ZOOM_MAX = 17;
const MAP_ZOOM_MIN = 1;
const MARKER_ICON = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 40]  // for proper placement
});

export default class Atlas extends Component {

  constructor(props) {
    super(props);

    this.addMarker = this.addMarker.bind(this);
    this.updateMarkerCallback = this.updateMarkerCallback.bind(this);
    this.updateMarkerFromInput = this.updateMarkerFromInput.bind(this);
    this.errorCallback = this.errorCallback.bind(this);

    this.state = {
      markerPosition: [],
      hideButton: false,
      mapCenter: [0,0],
      validLatLng: FALSECOLOR
    };
    this.getCurrentLocation();
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 6, offset: 3}}>
                {this.renderLeafletMap()}
              </Col>
            </Row>
            <Row>
              <Col sm={12} style={{ width: "7rem" }} md={{size: 1, offset: 3}}>
                {this.showHomeButton()}
              </Col>
              <Col sm={{size:'auto'}} style={{ width: "15rem" }} md={{size: 4, offset: 0}}>
                <Form inline={true}>{
                    <Input style={{ width: "15rem", border: this.state.validLatLng }} placeholder="Latitude, Longitude" onInput={e => this.handleInput(e.target.value)}/>
                }</Form>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

  renderLeafletMap() {
    return (
        <Map center={MAP_CENTER_DEFAULT}
             zoom={MAP_ZOOM_MAX}
             minZoom={MAP_ZOOM_MIN}
             maxZoom={MAP_ZOOM_MAX}
             maxBounds={MAP_BOUNDS}
             onClick={this.addMarker}
             style={{height: MAP_STYLE_LENGTH, maxWidth: MAP_STYLE_LENGTH}}>
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.getMarker(this.getMarkerPosition(), this.state.markerPosition)}
        </Map>
    )
  }

  handleInput(pos) {
    if (this.isValidPosition(pos)) {
        this.setState({validLatLng: TRUECOLOR});
      this.updateMarkerFromInput(pos);
    }else{
      this.setState({validLatLng: FALSECOLOR});
    }

  }

  updateMarkerFromInput(input) {
    let position = new Coordinates(input);
    this.addMarker({latlng: {lat: position.getLatitude(), lng: position.getLongitude()}});
  }

  /**
   * Adapted from Coordinate-Parser isValidPosition Function
   * @param position takes the string of charcters input in lat lng above
   */
  isValidPosition(position) {
    let caughtError;

    try{
      new Coordinates(position);
      return(true);
    }catch(caughtError){
      return(false);
    }
  }

  getMarkerPosition() {
    let markerPosition = '';
    if (this.state.markerPosition.length !== 0) {
      let marker = this.state.markerPosition[this.state.markerPosition.length - 1];
      markerPosition = marker.lat.toFixed(2) + ', ' + marker.lng.toFixed(2);
    }
    return markerPosition;
  }

  getMarker(bodyJSX, markers) {
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    };

    if (markers.length !== 0) {
      let markerList = [];
      markers.forEach(marker => {
        markerList.push(
          <Marker ref={initMarker} position={marker} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} className="font-weight-bold">{bodyJSX}</Popup>
          </Marker>
        );
      });

      return (
          <div>{markerList}</div>
      );
    }
  }

  showHomeButton() {
    if (this.state.hideButton === false) {
      return (
          <Button className='btn-csu' onClick={() => this.getCurrentLocation()}><strong>Home</strong></Button>
      );
    }
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(this.updateMarkerCallback, this.errorCallback);
    return null;
  }

  updateMarkerCallback(pos) {
    this.addMarker({latlng: {lat: pos.coords.latitude, lng: pos.coords.longitude}});
  }

  errorCallback(errData) {
    this.addMarker({latlng: {lat: 40.57, lng: -105.09}});

    if (errData.message === "User denied Geolocation") {
      this.setState({hideButton: true})
    }
  }

  addMarker(mapClickInfo) {
    this.setState(prevState => ({
      markerPosition: [...prevState.markerPosition, mapClickInfo.latlng]
    }));
  }
}
