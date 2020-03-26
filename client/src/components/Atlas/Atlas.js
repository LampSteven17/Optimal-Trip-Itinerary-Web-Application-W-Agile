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

import {FeatureGroup, Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Geolocation from '@react-native-community/geolocation';
import {
  getOriginalServerPort,
  isJsonResponseValid,
  sendServerRequest,
  sendServerRequestWithBody
} from "../../utils/restfulAPI";
import * as distanceRequestSchema from "../../../schemas/DistanceRequest";
import * as distanceResponseSchema from "../../../schemas/DistanceResponse";
import * as tripRequestSchema from "../../../schemas/TripFile";

import Itinerary from '../../components/Atlas/Itinerary';
import LoadFileButton from "./LoadFileButton";

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
    this.distance = 0;
    this.map;
    this.group;
    this.binder();

    this.state = {
      markerPosition: [],
      id: 0,
      hideButton: false,
      mapCenter: [0,0],
      validLatLng: FALSECOLOR,
      inputPosition: null,
      displayNum: "",
      displayUnit: "",
      totalDistance: 0,
      itenData : [{id: 1, destination: "", leg: "", total: ""}],
      tripRequestData: {}
    };

    this.getCurrentLocation();
  }

  binder() {
    this.addMarker = this.addMarker.bind(this);
    this.updateMarkerCallback = this.updateMarkerCallback.bind(this);
    this.updateMarkerFromInput = this.updateMarkerFromInput.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.sendTrip = this.sendTrip.bind(this);
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 6, offset: 3}}>
                <h2>Distance: {this.state.displayNum} {this.state.displayUnit}</h2>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={{size: 6, offset: 3}}>
                {this.renderLeafletMap()}
              </Col>
            </Row>
            {this.renderBaseButtons()}
            {this.renderItinerary()}
          </Container>
        </div>
    );
  }

  renderBaseButtons() {
    return(
        <Row>
          <Col sm={{size:'auto'}} style={{ width: "4.4rem" }} md={{size: 0, offset: 3}}>
            {this.showHomeButton()}
          </Col>
          <Col sm={{size:'auto'}} style={{ width: "11.7rem" }} md={{size: 0, offset: 0}}>
            <Form inline={true}>{
              <Input style={{ width: "15rem", border: this.state.validLatLng }} placeholder="Latitude, Longitude" onInput={e => this.handleInput(e.target.value)}/>
            }</Form>
          </Col>
          <Col>
            <Button className={"btn-csu"} onClick={() => this.updateMarkerFromInput()}>+</Button>
          </Col>
        </Row>
    )
  }

  componentDidMount() {
    if (this.mapRef.current) {
      this.map = this.mapRef.current.leafletElement;
    }
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
             {this.getMarker()}
             {this.drawLines()}
        </Map>
    )
  }

  renderItinerary(){
    return(
    <Row>
      <Col sm={12} md={{size: 6, offset: 3}}>
        <LoadFileButton onChange={this.sendTrip}/>
        <Itinerary dests={this.state.itenData}/>
      </Col>
    </Row>
    )
  }


  handleInput(pos) {
    if (this.isValidPosition(pos)) {
      this.setState({validLatLng: TRUECOLOR});
      this.storeInputPosition(pos);
    }else{
      this.setState({validLatLng: FALSECOLOR});
    }
  }

  storeInputPosition(input) {
    let position = new Coordinates(input);
    this.setState({inputPosition: {lat: position.getLatitude(), lng: position.getLongitude()}});
  }

  updateMarkerFromInput() {
    if(this.state.inputPosition !== null){
      this.addMarker({latlng: {lat: this.state.inputPosition.lat, lng: this.state.inputPosition.lng}});
    }
  }

  /**
   * Adapted from Coordinate-Parser isValidPosition Function
   * @param position takes the string of charcters input in lat lng above
   */
  isValidPosition(position) {
    let caughtError;

    try{
      new Coordinates(position);
      return true;
    }catch(caughtError){
      return false;
    }
  }

  formatPosition(position) {
    let markerPosition = '';
    markerPosition = position.lat.toFixed(2) + ', ' + position.lng.toFixed(2);
    return markerPosition;
  }

  getMarker() {
    if (this.state.markerPosition.length !== 0) {
      let markerList = [];
      this.state.markerPosition.forEach((marker, i) => {
        markerList.push(
          <Marker key={i}  position={marker} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} style={{ width: "50" }} className="font-weight-bold">
              {this.formatPosition(marker)}
              <Button className='btn-csu' style={{ width: "100%", backgroundColor: "red" }} onClick={() => this.deleteMarker(marker)}><strong>Delete</strong></Button>
            </Popup>
          </Marker>
        );
      });
      return (
          <FeatureGroup ref={this.groupRef}>{markerList}</FeatureGroup>
      );
    }
  }

  deleteMarker(marker) {
    let newArray = this.state.markerPosition.filter(function(mk) {
      return mk.id !== marker.id;
    });

    Promise.resolve()
    .then(() => this.setState({markerPosition: newArray}))
    .then(() => this.updateDistance());
  }

  async addMarker(mapClickInfo) {
    Promise.resolve()
    .then(() => {
      mapClickInfo.latlng.id = this.state.id;
      this.setState({id: this.state.id + 1});
      this.setState(prevState => ({
        markerPosition: [...prevState.markerPosition, {lat: mapClickInfo.latlng.lat, lng: mapClickInfo.latlng.lng, id: mapClickInfo.latlng.id}]
      }), () => {
        if (this.state.markerPosition.length > 1) {
          this.updateDistance();
        }
      });
    })
    .then(() => this.getCenter());
  }

  async updateDistance() {
    this.distance = 0;
    let points = this.getPositions();
    Promise.resolve()
    .then(async () => {
      for (let i = 0; i < points.length; i++) {
        if (i !== points.length - 1) {
          let requestBody = {
            requestVersion: this.props.serverVers.requestVersion,
            requestType: "distance",
            place1: {latitude: points[i][0].toString(), longitude: points[i][1].toString()},
            place2: {latitude: points[i+1][0].toString(), longitude: points[i+1][1].toString()},
            earthRadius: 6371.0
          };
          await this.sendRequest(requestBody, "distance", distanceRequestSchema);
        }
      }
    })
    .then(() => this.setState({displayNum: this.distance, displayUnit: "KM"}));
  }


  /* This method sends a successful trip. Obviously it will need to be formatted with the data we choose to
  use at any given time.
  I'm leaving it here so we have the shell and a request you can test with when building up the itenerary and
  such. Delete whenever it's use has ended if needed - <3 Cade
   */
  async sendTrip(requestBody) {
    Promise.resolve()
        .then(async () => {
          //console.log(requestBody);

          await this.sendRequest(requestBody, "trip", tripRequestSchema)
        })
    // .then() update vars as needed here
  }

  async getCenter() {
    this.adjustZoomToFitPoints();
  }

  async adjustZoomToFitPoints() {
    const group = this.groupRef.current.leafletElement;
    this.map.fitBounds(group.getBounds());
  }

  showHomeButton() {
    if (this.state.hideButton === false) {
      return (
          <Button className='btn-csu' onClick={() => this.handleHomeClick()}><strong>Home</strong></Button>
      );
    }
  }

  handleHomeClick() {
    this.setState({displayNum: 0});
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(this.updateMarkerCallback, this.errorCallback);
    return null;
  }

  updateMarkerCallback(pos) {
    this.setState({markerPosition: []});
    this.addMarker({latlng:{lat: pos.coords.latitude, lng: pos.coords.longitude}});
  }

  errorCallback(errData) {
    this.addMarker({latlng: {lat: 40.57, lng: -105.09}});

    if (errData.message === "User denied Geolocation") {
      this.setState({hideButton: true});
    }
  }

  async sendRequest(request, requestType, schema) {
    if (!isJsonResponseValid(request, schema)) {
      console.error(requestType +  "REQUEST INVALID");
      return;
    }
    switch (requestType) {
      case "distance":
        await sendServerRequestWithBody("distance", request, this.props.serverPort)
            .then((data) => this.promptDistance(data.body));
        break;
      case "trip":
        await sendServerRequestWithBody("trip", request, this.props.serverPort)
            .then((data) => this.promptTrip(data.body));
        break;
      default: console.log("UNSUPPORTED REQUEST TYPE");
        return;
    }
  }

  promptTrip(data) {
    this.setState({itenData: this.parseData(data.places, data.distances)});
  }

  parseData(names, legs){
    let formatted = [];

    for(let vals of names){
      let index = names.indexOf((vals));
      let totalVal = 0;

      if(index !== 0){
        totalVal+= (legs[index]+formatted[index-1].total);
      }else{
        totalVal=legs[index];
      }

      formatted.push(
          {
            id: index,
            destination: vals.name,
            leg: legs[index],
            total: totalVal
          })
    }

    return formatted;

  }

  promptDistance(dist) {
    if (!this.testResponse(dist, distanceResponseSchema)) {
      return;
    }
    this.distance = this.distance + dist.distance;
  }

  testResponse(body, schema) {
    if (!isJsonResponseValid(body, schema)) {
      console.error("JSON RESPONSE INVALID, NO STATE VARIABLES BEING MODIFIED");
      return false;
    }
    return true;
  }

  drawLines() {
    let points = this.getPositions();
    let lines;

    if (points.length > 1) {
      lines = this.generateLineArray(points);

      return (
        <div>
          {lines}
        </div>
      );
    }
  }

  getPositions() {
    let latlngArray = [];
    this.state.markerPosition.forEach((marker, i) => {
      latlngArray.push([marker.lat, marker.lng]);
    });

    if (this.state.markerPosition.length >= 2){
      latlngArray.push(latlngArray[0]);
    }

    return latlngArray;
  }

  generateLineArray(points) {
    let lines = [];
    let keyCount = 0;

    for (let i = 1; i < points.length; i++) {
      let checkLng = points[i-1][1] - points[i][1];
      let currentLine = [points[i-1], points[i]];

      if (Math.abs(checkLng) > 180) {
        lines = lines.concat(this.lineAcrossMeridian(points[i-1], points[i]));
      }
      else {
        lines.push(
            <Polyline key={Date.now() * Math.random()} color="red" positions={currentLine} />
        );
      }
    }

    return lines;
  }

  lineAcrossMeridian(point1, point2) {
    let lines = [];

    if (point1[1] < 0) {
      let lineOneCalc = [point2[0], point2[1] - 360];
      lines.push(
          <Polyline key={Date.now() * Math.random()} color="red" positions={[point1, lineOneCalc]} />
      );
      let lineTwoCalc = [point1[0], point1[1] + 360];
      lines.push(
          <Polyline key={Date.now() * Math.random()} color="red" positions={[lineTwoCalc, point2]} />
      );
    }
    else {
      let lineOneCalc = [point2[0], point2[1] + 360];
      lines.push(
        <Polyline key={Date.now() * Math.random()} color="red" positions={[lineOneCalc, point1]} />
      );
      let lineTwoCalc = [point1[0], point1[1] - 360];
      lines.push(
          <Polyline key={Date.now() * Math.random()} color="red" positions={[point2, lineTwoCalc]} />
      );
    }
    return lines;
  }
}
