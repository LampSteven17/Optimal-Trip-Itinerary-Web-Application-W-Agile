import React, {Component} from 'react';
import {Alert, Col, Container, Row} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

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
    this.errorCallback = this.errorCallback.bind(this);
    this.state = {
      markerPosition: this.getCurrentLocation(),
      showLocationErrorAlert: false
    };


  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 6, offset: 3}}>
                {this.renderLeafletMap()}
                <button className='btn-csu' onClick={() => this.markCurrentLocation()}><strong>Home</strong></button>
              </Col>
            </Row>
            {this.alertNoLocationData()}
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

  addMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng});
  }

  markCurrentLocation() {
    Promise.resolve()
    .then(() =>this.getCurrentLocation());

  }

  getMarkerPosition() {
    let markerPosition = '';
    if (this.state.markerPosition) {
      markerPosition = this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2);
    }
    return markerPosition;
  }

  getMarker(bodyJSX, position) {
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    };
    if (position) {
      return (
          <Marker ref={initMarker} position={position} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} className="font-weight-bold">{bodyJSX}</Popup>
          </Marker>
      );
    }
  }

  updateMarkerCallback(pos){
    this.setState({markerPosition: {lat: pos.coords.latitude, lng: pos.coords.longitude}});
  }

  errorCallback(errData){
    this.setState({markerPosition: {lat: 40.57, lng: -105.09}});

    if (errData.message === "User denied Geolocation") {
      this.setState({showLocationErrorAlert: true})
      this.alertNoLocationData();
    }
  }

  alertNoLocationData(){
    const noLocationErrMsg = "You Currently block your location. In order to \
      show your location please allow this site to access your location.";

    if (this.state.showLocationErrorAlert === true) {
      return (
        <Row>
          <Col sm={12} md={{size: 6, offset: 3}}>
            <Alert color="danger">{noLocationErrMsg}</Alert>
          </Col>
        </Row>
      );
    }
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(this.updateMarkerCallback, this.errorCallback);
  }
}
