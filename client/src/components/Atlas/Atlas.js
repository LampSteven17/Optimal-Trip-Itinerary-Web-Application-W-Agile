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

    this.addMarker = this.addMarker.bind(this);
    this.updateMarkerCallback = this.updateMarkerCallback.bind(this);
    this.updateMarkerFromInput = this.updateMarkerFromInput.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);

    this.state = {
      markerPosition: [],
      id: 0,
      hideButton: false,
      mapCenter: [0,0],
      validLatLng: FALSECOLOR,
      inputPosition: null,
      displayNum: "",
      displayUnit: "",
      totalDistance: 0
    };

    this.getCurrentLocation();
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
            {this.renderItinerary()}
          </Container>
        </div>
    );
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
              <Polyline color="red" positions={this.getPositions()} />
        </Map>
    )
  }

  renderItinerary(){
    return(
    <Row>
      <Col sm={12} md={{size: 6, offset: 3}}>
        <Itinerary />
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
    this.setState({inputPosition: {lat: position.getLatitude(), lng: position.getLongitude()}})
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
      return(true);
    }catch(caughtError){
      return(false);
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
    this.sendTrip(); //CADE
    /*
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

     */
  }

  async sendTrip() {
    Promise.resolve()
        .then(async () => {
          let requestBody = {
            "requestType" : "trip",
            "requestVersion" : 3,
            "options" : {
              "title" : "Around the world - 21655",
              "earthRadius" : "3959.0"
            },
            "places" : [
              {"name": "New York City", "latitude": "40.730610", "longitude": "-73.935242"},
              {"name": "London", "latitude": "51.509865", "longitude": "-0.118092"},
              {"name": "Baghdad", "latitude": "33.312805", "longitude": "44.361488"},
              {"name": "Singapore", "latitude": "1.290270", "longitude": "103.851959"},
              {"name": "Tokyo", "latitude": "35.652832", "longitude": "139.839478"},
              {"name": "Los Angelos", "latitude":"34.052235", "longitude": "-118.243683"}
            ]
          }
          await this.sendRequest(requestBody, "trip", tripRequestSchema);
        })
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
        console.log("herererererererererererer");
        await sendServerRequestWithBody("trip", request, this.props.serverPort)
            .then((data) => this.promptTrip(/* add here too */));
        break;
      default: console.log("UNSUPPORTED REQUEST TYPE");
        return;
    }
  }

  promptTrip(/* some vars here*/) {
    /*
    this should set the state variables like distance does
     */
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
}
