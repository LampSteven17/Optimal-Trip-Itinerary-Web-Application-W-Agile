import React, {createRef, Component} from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Input,
  Row
} from 'reactstrap';

import {FeatureGroup, Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Geolocation from '@react-native-community/geolocation';
import {
  isJsonResponseValid,
  sendServerRequestWithBody
} from "../../utils/restfulAPI";
import * as distanceRequestSchema from "../../../schemas/DistanceRequest";
import * as distanceResponseSchema from "../../../schemas/DistanceResponse";
import * as tripRequestSchema from "../../../schemas/TripRequest";

import Itinerary from './Itinerary';
import Save from './Save';
import LoadFileButton from "./LoadFileButton";
import MarkerPolyline from './MarkerPolyline';
import {PROTOCOL_VERSION} from "../Constants";

const FALSECOLOR = "5px solid red";
const TRUECOLOR =  "5px solid green";
const Coordinates = require('coordinate-parser');
const MAP_BOUNDS = [[-90, -180], [90, 180]];
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

    this.createGlobals();
    this.binder();

    this.state = {
      markerPosition: [],
      hideButton: false,
      mapCenter: [0, 0],
      validLatLng: FALSECOLOR,
      displayNum: "",
      displayUnit: "",
      totalDistance: 0,
      itenData: [{id: -1, destination: "", leg: "", total: ""}],
      tripRequestData: {},
      tipDataForMarkers: {},
    };

    this.getCurrentLocation();
  }

  createGlobals() {
    this.id = 0;
    this.mapRef = createRef();
    this.groupRef = createRef();
    this.namesArray = [];
    this.distance = 0;
    this.distanceArray = [];
    this.lastDistanceCalculation = 0;
    this.inputPosition = null;
    this.map;
    this.group;
    this.itineraryNameCounter = 1;
  }

  binder() {
    this.addMarker = this.addMarker.bind(this);
    this.updateMarkerCallback = this.updateMarkerCallback.bind(this);
    this.updateMarkerFromInput = this.updateMarkerFromInput.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.sendTrip = this.sendTrip.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.appendToItinerary = this.appendToItinerary.bind(this);
    this.changeStateInLoadFileButton = this.changeStateInLoadFileButton.bind(this);
    this.addMarkersForTrip = this.addMarkersForTrip.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
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
    return (
        <div>
          <Row>
            {this.renderHomeButton()}
            {this.renderStuff()}
            {this.renderPlusButton()}
          </Row>
        </div>
    )
  }

  renderStuff(){
    return(
    this.colRenderer(<Form inline={true}>{
      <Input style={{width: "15rem", border: this.state.validLatLng}} placeholder="Latitude, Longitude"
             onInput={e => this.handleInput(e.target.value)}/>
    }</Form>,"11.7rem",0,0,'auto')
        );
  }

  renderHomeButton(){
    let tempy = this.showHomeButton();
    return(
        this.colRenderer(tempy,"4.4rem",0,3,'auto')
    );
  }

  renderPlusButton(){
    return(
      this.colRenderer(<Button className={"btn-csu"} onClick={() => this.updateMarkerFromInput()}>+</Button>,"0rem",0,0,'auto')
    );
  }

  colRenderer(otherObj,widthy,sizey,offsety,smy){
    return(
    <Col sm={{size: smy}} style={{width: widthy}} md={{size: sizey, offset: offsety}}>
      {otherObj}
    </Col>
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
          <MarkerPolyline markerPosition={this.state.markerPosition} />
        </Map>
    )
  }

  renderItinerary() {
    return (
        <div>
          <Row style={{padding: "10px"}}>
            {this.loadFileButtonRenderer()}
            {this.saveRenderer()}
          </Row>
          <Row>
            {this.reverseRenderer()}
          </Row>
          <Row>
            {this.itenRenderer()}
          </Row>
        </div>
    )
  }

  itenRenderer(){
    return(
      this.colRenderer(<Itinerary dests={this.state.itenData}/>,null,6,3,12)
    );
  }

  reverseRenderer(){
    return(
      this.colRenderer(<Button className={"btn-csu"} onClick={() => this.reverseTrip()}>Reverse Trip</Button>,null,2,3,12)
    );
  }

  loadFileButtonRenderer(){
    return(
      this.colRenderer(<LoadFileButton action={this.changeStateInLoadFileButton}
                                       onChange={this.sendTrip}/>,null,3,3,12)
    );
  }

  saveRenderer(){
    return(
        this.colRenderer(<Save mpArray={this.state.markerPosition} names={this.namesArray}/>,null,6,3,12)
    )
  }

  changeStateInLoadFileButton() {
    this.setState({markerPosition: [], displayNum: 0});
    this.distance = 0;
    this.lastDistanceCalculation = 0;
  }

  handleInput(pos) {
    if (this.isValidPosition(pos)) {
      this.setState({validLatLng: TRUECOLOR});
      this.storeInputPosition(pos);
    } else {
      this.setState({validLatLng: FALSECOLOR});
    }
  }

  storeInputPosition(input) {
    let position = new Coordinates(input);
    this.inputPosition = {lat: position.getLatitude(), lng: position.getLongitude()};
  }

  updateMarkerFromInput() {
    if (this.state.inputPosition !== null) {
      this.addMarker({latlng: {lat: this.inputPosition.lat, lng: this.inputPosition.lng}});
    }
  }

  /**
   * Adapted from Coordinate-Parser isValidPosition Function
   * @param position takes the string of charcters input in lat lng above
   */
  isValidPosition(position) {
    let caughtError;

    try {
      new Coordinates(position);
      return true;
    } catch (caughtError) {
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
            <Marker key={i} position={marker} icon={MARKER_ICON}>
              <Popup offset={[0, -18]} style={{width: "50"}} className="font-weight-bold">
                {this.formatPosition(marker)}
                <Button className='btn-csu' style={{width: "100%", backgroundColor: "red"}}
                        onClick={() => this.deleteMarker(marker)}><strong>Delete</strong></Button>
              </Popup>
            </Marker>
        );
      });
      return (
          <FeatureGroup ref={this.groupRef}>{markerList}</FeatureGroup>
      );
    }
  }

  async deleteMarker(marker) {
    this.lastDistanceCalculation = 0;
    let newMarkerArray = this.removeMarker(marker);
    let newItineraryArray = this.state.itenData;

    this.removeName(marker);

    let jsonTemp = this.tripObjTemplate();

    newMarkerArray.forEach((item, i) => {
      jsonTemp.places.push({name: this.namesArray[i].name, latitude: item.lat.toString(), longitude: item.lng.toString()});
    });

    await this.setDeleteStates(newMarkerArray, jsonTemp);
  }

  removeMarker(marker) {
    let newMarkerArray = this.state.markerPosition.filter(function (mk) {
      return mk.id !== marker.id;
    });
    return newMarkerArray;
  }

  removeName(marker) {
    this.state.itenData.forEach((item, i) => {
      let idMatch = marker.id === item.id;

      if (idMatch) {
        this.namesArray = this.namesArray.filter((nm) => {
          return nm.name !== item.destination;
        });
      }
    });
  }

  tripObjTemplate() {
    return {
        requestType: "trip",
        requestVersion: PROTOCOL_VERSION,
        options: {
          title:"Trip",
          earthRadius:"3959.0",
          optimization: {
            construction: "none",
            improvement: "none",
            response: "1"
          }
        },
        places: []
    };
  }

  async setDeleteStates(newMarkerArray, jsonTemp) {
    Promise.resolve()
    .then(() => this.setState({markerPosition: newMarkerArray}))
    .then(async () => {
      if (newMarkerArray.length === 0) {
        this.setState({itenData: [{id: -1, destination: "", leg: "", total: ""}]});
      }
      else if (newMarkerArray.length === 1) {
        this.setState(prevState => ({itenData: [prevState.itenData[0]]}));
      }
      else {
        await this.sendRequest(jsonTemp, "trip", tripRequestSchema);
      }
    });
  }

  async addMarker(mapClickInfo, getDistance = true) {
    Promise.resolve()
        .then(() => {
          mapClickInfo.latlng.id = this.id;
          this.id += 1;
          if (Number.isNaN(mapClickInfo.latlng.id)) {
            mapClickInfo.latlng.id = Math.random();
          }
          this.setState(prevState => ({
            markerPosition: [...prevState.markerPosition, {
              lat: mapClickInfo.latlng.lat,
              lng: mapClickInfo.latlng.lng,
              id: mapClickInfo.latlng.id
            }]
          }), () => {
            if (this.state.markerPosition.length > 1) {
              this.updateDistance("add");
            } else {
              this.appendToItinerary();
            }
          });
        })
        .then(() => this.adjustZoomToFitPoints());
  }

  async updateDistance(type) {
    let points = this.distancePositions();
    Promise.resolve()
        .then(async () => {

          switch (type) {
            case "add":
              this.distance = this.distance - this.lastDistanceCalculation;
              await this.distanceRequestBody(points.length - 3,
                  points.length - 1, points);
              break;

            case "delete":
              this.distance = 0;
              await this.distanceRequestBody(0, points.length - 1, points, true);
              break;
          }

        })
        .then(() => this.setState({displayNum: this.distance, displayUnit: "KM"}));
  }

  distancePositions() {
    let positions = [];
    this.state.markerPosition.forEach((marker, i) => {
      positions.push([marker.lat, marker.lng]);
    });
    if(positions.length >= 2) {
      positions.push(positions[0]);
    }
    return positions;
  }


  async distanceRequestBody(i, amount, points, isDelete=false) {
    if (!isDelete) {
        this.distanceArray.pop();
    }

    for (i; i < amount; i++) {
      let requestBody = {
        requestVersion: this.props.serverVers.requestVersion,
        requestType: "distance",
        place1: {latitude: points[i][0].toString(), longitude: points[i][1].toString()},
        place2: {latitude: points[i + 1][0].toString(), longitude: points[i + 1][1].toString()},
        earthRadius: 6371.0
      };

      if (i === amount - 1) {
        await this.sendRequest(requestBody, "distance", distanceRequestSchema, isDelete, true);
      } else {
        await this.sendRequest(requestBody, "distance", distanceRequestSchema, isDelete);
      }
    }
  }


  async sendTrip(requestBody) {
    Promise.resolve()
        .then(async () => {
          await this.sendRequest(requestBody, "trip", tripRequestSchema)
        })
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
    this.distanceArray = [];
    this.namesArray = [];
    this.setState({itenData: [{id: -1, destination: "", leg: "", total: ""}]});
    this.lastDistanceCalculation = 0;
    this.distance = 0;
    this.setState({displayNum: 0});
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(this.updateMarkerCallback, this.errorCallback);
    return null;
  }

  updateMarkerCallback(pos) {
    this.setState({markerPosition: []});
    this.addMarker({latlng: {lat: pos.coords.latitude, lng: pos.coords.longitude}});
  }

  errorCallback(errData) {
    this.addMarker({latlng: {lat: 40.57, lng: -105.09}});

    if (errData.message === "User denied Geolocation") {
      this.setState({hideButton: true});
    }
  }

  async sendRequest(request, requestType, schema, isDelete, isLastLeg = false) {
    if (!isJsonResponseValid(request, schema)) {
      console.error(requestType + "REQUEST INVALID");
      return;
    }
    switch (requestType) {
      case "distance":
        await sendServerRequestWithBody("distance", request, this.props.serverPort)
            .then((data) => this.promptDistance(data.body, isLastLeg, isDelete));
        break;
      case "trip":
        await sendServerRequestWithBody("trip", request, this.props.serverPort)
            .then((data) => this.promptTrip(data.body));
        break;
      default:
        console.error("UNSUPPORTED REQUEST TYPE");
        return;
    }
  }


  // if (this.state.itenData.length > 2) {
  //   id = this.state.markerPosition[index-1].id;
  // }
  // else if (this.state.markerPosition[index]) {
  //   id = Math.random() * Date.now();
  // } KEEPING FOR WHATEVER

  appendToItinerary(isLastLeg=false) {
    let index = this.state.itenData.length;
    let id = Math.random() * Date.now();

    let nameid = this.state.itenData[this.state.itenData.length - 1].id + 1;
    let name = "Marker " + this.itineraryNameCounter;
    if (!isLastLeg) {
      this.itineraryNameCounter += 1;
    }
    let newItineraryData;

    if (!isLastLeg) {
      this.namesArray.push({name: name});
    }

    if (this.state.itenData[0].id === -1) {
      newItineraryData = {
        itenData: [{id: 0,destination: name,leg: this.lastDistanceCalculation,total: this.distance}]
      };
    } else if (isLastLeg) {
      name = this.state.itenData[0].destination;
      newItineraryData = prevState => ({
        itenData: [...prevState.itenData, {id: Math.random(),destination: name,leg: this.lastDistanceCalculation,total: this.distance}]
      });
    } else if (this.state.itenData.length > 2) {
      let newArr = this.state.itenData;
      newArr.pop();
      newItineraryData = prevState => ({
        itenData: [...newArr, {id: id, destination: name, leg: this.lastDistanceCalculation, total: this.distance}]
      });
    } else {
      newItineraryData = prevState => ({
        itenData: [...prevState.itenData, { id: id, destination: name, leg: this.lastDistanceCalculation,total: this.distance}]
      });
    }
    this.setState(newItineraryData);
  }

  promptTrip(data) {
    this.addMarkersForTrip(data);
    this.distanceArray = data.distances;
    this.namesArray = Array.from(data.places, x => {
      return {name: x.name};
    });
    if (this.namesArray.length === 1) {
      this.setState({itenData: [{id: 0, destination: this.namesArray[0].name, leg: "0", total: "0"}]})
    }
    else {
      this.setState({itenData: this.parseData(data.places, data.distances, data.options.earthRadius)});
    }
  }

  async addMarkersForTrip(data) {
    let newMarkers = [];
    let idForInput = 0;
    data.places.forEach((place, i) => {
      newMarkers.push({lat: parseFloat(place.latitude), lng: parseFloat(place.longitude), id: idForInput});
      idForInput = idForInput + 1;
    });
    Promise.resolve(
        this.setState({markerPosition: newMarkers, id: this.idForInput})
    ).then(() => this.adjustZoomToFitPoints())

  }

  parseData(names, legs, radius) {
    let formatted = [];
    names.push(names[0]);
    legs.unshift(0);

    names.forEach((vals, i) => {
      let index = i;
      let totalVal = 0;

      if (index !== 0) {
        totalVal += (legs[index] + formatted[index - 1].total);
      } else {
        totalVal = legs[index];
        legs[index] = 0;
      }

      formatted.push(
          {
            id: index,
            destination: vals.name,
            leg: legs[index],
            total: totalVal
          }
      );
    });

    this.setState({displayUnit: this.getUnitRadius(radius), displayNum: formatted[formatted.length - 1].total});
    this.distance = formatted[formatted.length - 1].total;

    return formatted;
  }

  reverseTrip() {
    let data = this.state.itenData;
    if (data.length > 1) {
      let distances = Array.from(data, x => x.leg);
      distances.splice(0, 1);
      let distanceReverse = distances.reverse();
      data.pop();
      let nameReverse = data.reverse();
      nameReverse = Array.from(nameReverse, x => {
        return {name: x.destination};
      });

      let reverseObj = this.getReverseTripObject(nameReverse, distanceReverse);

      this.setState({itenData: this.parseData(reverseObj.places, reverseObj.distances, reverseObj.options.earthRadius)});
    }
  }

  getReverseTripObject(name_r, distance_r) {
    let reverse = {
      options: {
        earthRadius: 3959,
        optimization: {
          construction: "none",
          improvement: "none",
          response: "1"
        },
        title: "Trip"
      },
      places: name_r,
      distances: distance_r,
      requestType: "trip",
      requestVersion: PROTOCOL_VERSION
    };
  }

  getUnitRadius(radius) {
    if (radius / 6371.0 === 1) {
      return "KM";

    } else if (radius / 3959 === 1) {
      return "Miles"

    }

    return " -- ";
  }

  promptDistance(dist, isLastLeg, isDelete) {
    if (!this.testResponse(dist, distanceResponseSchema)) {
      return;
    }
    this.lastDistanceCalculation = dist.distance;
    this.distance = this.distance + dist.distance;
    this.distanceArray.push(dist.distance);
    if (!isDelete) {
      this.appendToItinerary(isLastLeg);
    }
  }

  testResponse(body, schema) {
    if (!isJsonResponseValid(body, schema)) {
      console.error("JSON RESPONSE INVALID, NO STATE VARIABLES BEING MODIFIED");
      return false;
    }
    return true;
  }
}
