import React, {createRef, Component} from 'react';
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

import {FeatureGroup, Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Geolocation from '@react-native-community/geolocation';
import {getOriginalServerPort, sendServerRequest, sendServerRequestWithBody} from "../../utils/restfulAPI";

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

    this.mapRef = createRef();
    this.groupRef = createRef();

    this.addMarker = this.addMarker.bind(this);
    this.updateMarkerCallback = this.updateMarkerCallback.bind(this);
    this.updateMarkerFromInput = this.updateMarkerFromInput.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.updateMapCenter = this.updateMapCenter.bind(this);

    this.state = {
      markerPosition: [],
      id: 0,
      hideButton: false,
      mapCenter: [0,0],
      validLatLng: FALSECOLOR,
      currentArrayPos: 0
    };

    this.getCurrentLocation();
    this.sendDistanceRequest("40.6","-105.1","-33.9","151.2",6371);
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
        <Map center={this.state.mapCenter}
             zoom={MAP_ZOOM_MAX}
             minZoom={MAP_ZOOM_MIN}
             maxZoom={MAP_ZOOM_MAX}
             maxBounds={MAP_BOUNDS}
             ref={this.mapRef}
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

  sendDistanceRequest(lat1,lon1,lat2,lon2,earthRad){
    let requestBody = {
      requestVersion: 1,
      requestType: "distance",
      place1: {latitude: lat1, longitude: lon1},
      place2: {latitude: lat2, longitude: lon2},
      earthRadius: earthRad
    };

    sendServerRequestWithBody('distance', requestBody, getOriginalServerPort())
    .then((data) => this.promptDistance(data.body.distance));

  }

  promptDistance(dist){
    console.log(dist);

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
    if (markers.length !== 0) {
      let markerList = [];
      markers.forEach((marker, i) => {
        markerList.push(
          <Marker key={i}  position={marker} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} style={{ width: "50" }} className="font-weight-bold">
              {bodyJSX}
              <Button className='btn-csu' style={{ width: "100%", backgroundColor: "red" }} onClick={() => this.deleteMarker(marker)}><strong>Delete</strong></Button>
            </Popup>getCenter
          </Marker>
        );
      });
      return (
          <FeatureGroup ref={this.groupRef}>{markerList}</FeatureGroup>
      );
    }
  }

  deleteMarker(marker) {
    if (this.state.markerPosition.length === 1) {
      this.setState({markerPosition: []});
    }
    else {
      this.setState({markerPosition: this.state.markerPosition.filter((mk) => {
        return mk.id !== marker.id;
      })});
    }
  }

  getCenter() {
    let lat, lng;
    if (this.state.markerPosition.length === 1) {
      lat = this.state.markerPosition[0].lat;
      lng = this.state.markerPosition[0].lng;
    }
    else if (this.state.markerPosition.length === 2) {
      let midpoint = this.getLineMidpoint();
      lat = midpoint[0];
      lng = midpoint[1];
    }
    else {
      let centroid = this.getPolygonCentroid();
      lat = centroid[0];
      lng = centroid[1];
    }

    this.updateMapCenter(lat,lng);
    this.adjustZoomToFitPoints();
  }

  getLineMidpoint() {
    let lat1 = this.state.markerPosition[0].lat;
    let lng1 = this.state.markerPosition[0].lng;
    let lat2 = this.state.markerPosition[1].lat;
    let lng2 = this.state.markerPosition[1].lng;

    let lat = (lat1 + lat2) / 2;
    let lng = (lng1 + lng2) / 2;

    return [lat, lng];
  }

  getPolygonCentroid() {
    let points = [];
    this.state.markerPosition.forEach((marker, i) => {
      points.push([marker.lat, marker.lng])
    });

    let first = points[0], last = points[points.length - 1];
    if (first.x != last.x || first.y != last.y)
      points.push(first);

    let twicearea = 0;
    let x = 0,y = 0;
    let npoints = points.length;
    let p1,p2,f;

    for (let i = 0, j = npoints - 1; i < npoints; j = i++) {
      p1 = points[i];
      p2 = points[j];
      f = p1.x * p2.y - p2.x * p1.y;
      twicearea += f;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
    }

    f = twicearea * 3;
    lat = x / f;
    lon = y / f;

    return [lat, lon];
  }

  updateMapCenter(lat, lng) {
    this.setState({mapCenter: [lat, lng]});
  }

  adjustZoomToFitPoints() {
    const map = this.mapRef.current.leafletElement;
    const group = this.groupRef.current.leafletElement;
    map.fitBounds(group.getBounds());
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
    this.setState({currentArrayPos: 0});
    this.addMarker({latlng: {lat: pos.coords.latitude, lng: pos.coords.longitude}});
  }

  errorCallback(errData) {
    this.setState({currentArrayPos: 0});
    this.addMarker({latlng: {lat: 40.57, lng: -105.09}});

    if (errData.message === "User denied Geolocation") {
      this.setState({hideButton: true});
    }
  }

  addMarker(mapClickInfo) {
    mapClickInfo.latlng.id = this.state.id;
    this.setState({id: this.state.id + 1});
    if(this.state.currentArrayPos === 0){
      this.setState(prevState => ({
        markerPosition: [mapClickInfo.latlng]
      }));
      this.setState({currentArrayPos: 1});
    }
    else {
      this.setState(prevState => ({
        markerPosition: [...prevState.markerPosition, mapClickInfo.latlng]
      }));
      this.setState({currentArrayPos: 0})
    }

    this.getCenter();
  }
}
