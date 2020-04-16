import './enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {Polyline} from 'react-leaflet';
import {Row} from 'reactstrap';

import Atlas from '../src/components/Atlas/Atlas';

const FALSECOLOR = "5px solid red";
const TRUECOLOR =  "5px solid green";

function testInitialAppState() {
  jest.mock('leaflet');
  const app = shallow(<Atlas />);

  let actualMarkerPosition = app.state().markerPosition;
  let actualMapCenter = app.state().mapCenter;

  let expectedMarkerPosition = [];
  let expectedMapCenter = [0, 0];

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
  expect(actualMapCenter).toEqual(expectedMapCenter);
}

function testInitialHandleInput() {
  jest.mock('leaflet');
  const app = shallow(<Atlas />);

  try {
    let validCoords = Coordinates(45.9, -105.3);
    expect(validCoords);
    this.handleInput(validCoords);
    expect(this.state.validLatLng).toEqual(TRUECOLOR);
  }catch(error){

  }


  try {
    let invalidCoords = Coordinates("sfs", "ljsjf");
  }catch(error){
    expect(error);
  }
}

function testStoreInputPosition(){
  jest.mock('leaflet');
  let testInputPosAtlas = mount(<Atlas />);

  let position = "23, 23";

  let expectedOutput = {lat: 23, lng: 23};

  testInputPosAtlas.instance().storeInputPosition(position);

  Promise.resolve().then(r => expect(testInputPosAtlas.instance().inputPosition).toEqual(expectedOutput));
}

function testValidatePos() {
  jest.mock('leaflet');
  let testValidateAtlas = mount(<Atlas />);

  let position = "23, 232";

  let output = testValidateAtlas.instance().isValidPosition(position);
  expect(true).toEqual(output);

  position = "not a valid pos";

  output = testValidateAtlas.instance().isValidPosition(position);
  expect(false).toEqual(output);
}

function testDeleteMarker() {
  jest.mock('leaflet');
  let testDeleteAtlas = mount(<Atlas />);

  let markerPositions = [{lat: 38.83418, lng: -104.82497, id: 0},
    {lat: 40.586345, lng: -105.075813, id: 1},
    {lat: 40.14055556, lng: -105.13111111, id: 2}];

  let expectedOutput = [{lat: 38.83418, lng: -104.82497, id: 0},
    {lat: 40.14055556, lng: -105.13111111, id: 2}];

  let marker = {lat: 40.586345, lng: -105.075813, id: 1};

  testDeleteAtlas.setState({markerPosition: markerPositions});

  testDeleteAtlas.instance().deleteMarker(marker);

  Promise.resolve().then(r => expect(testDeleteAtlas.state().markerPosition).toEqual(expectedOutput));
}

function testUpdateDistance() {
  jest.mock('leaflet');
  let testDistance = mount(<Atlas />);

  let markerPositions = [{lat: 40.441587, lng: -105.0986593, id: 0},
    {lat: 40.427871569236146, lng: -105.11126518249513, id: 1}];

  testDistance.setState({markerPositions: markerPositions});

  testDistance.instance().updateDistance('add').then(r =>
      expect(testDistance.distance).toEqual(4));
}

function testHomeButton() {
  jest.mock('leaflet');

  let testHome = mount(<Atlas />);

  testHome.setState({displayNum: 24});

  testHome.instance().handleHomeClick();

  expect(testHome.state().displayNum).toEqual(0);
}

function testAddMarkersForTrip() {
  jest.mock('leaflet');

  let testTripMarkers = mount(<Atlas />);

  let data = {places: [
    {id: "kaseda", name: "Phantom Canyon Brewing Co", municipality: "Colorado Springs", latitude: "38.83418", longitude: "-104.82497", altitude: "6035"},
    {id: "lnarmour", name: "Equinox Brewing", municipality: "Fort Collins", latitude: "40.586345", longitude: "-105.075813", altitude: "5003"},
    {id: "bmckee", name: "Oskar Blue Brewery", municipality: "Longmont", latitude: "40.14055556", longitude: "-105.13111111", altitude: "5019"}]
  };

  let expected = [{lat: 38.83418, lng: -104.82497, id: 0},
    {lat: 40.586345, lng: -105.075813, id: 1},
    {lat: 40.14055556, lng: -105.13111111, id: 2}];

  testTripMarkers.instance().addMarkersForTrip(data);

  expect(testTripMarkers.state().markerPosition).toEqual(expected);

}

function testStateChangeLFB() {
  jest.mock('leaflet');

  let testLFBStateChange = mount(<Atlas />);

  let oldMarkers = [{lat: 38, lng: -104, id: 0},
    {lat: 40, lng: -105, id: 1},
    {lat: 40, lng: -105, id: 2}];

  testLFBStateChange.setState({markerPosition: oldMarkers, displayNum: 3432});

  testLFBStateChange.instance().changeStateInLoadFileButton();

  expect(testLFBStateChange.state().markerPosition).toEqual([]);
  expect(testLFBStateChange.state().displayNum).toEqual(0);
}


test("Testing Atlas's Initial State", testInitialAppState);
test("Testing Atlas's Handle Input", testInitialHandleInput);
test("Testing Atlas's Store Input Position",testStoreInputPosition);
test("Testing Atlas's position validation", testValidatePos);
test("Testing Atlas's deleteMarker method", testDeleteMarker);
test("Testing Atlas's storeInputPosition", testStoreInputPosition);
test("Testing Atlas's updateDistance", testUpdateDistance);
test("Testing Atlas's home button method", testHomeButton);
test("Testing Atlas's addMarkersForTrip", testAddMarkersForTrip);
test("Testing Atlas's state change in LFB method", testStateChangeLFB);
