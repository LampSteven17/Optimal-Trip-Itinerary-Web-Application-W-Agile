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

  Promise.resolve().then(r => expect(testInputPosAtlas.state.inputPosition).toEqual(expectedOutput));
}

function testGetPositionsOutput() {
  jest.mock('leaflet');
  let testPosAtlas = mount(<Atlas />);

  let markerPositions = [{lat: 38.83418, lng: -104.82497, id: 0},
    {lat: 40.586345, lng: -105.075813, id: 1},
    {lat: 40.14055556, lng: -105.13111111, id: 2}];

  let expectedOutput = [[38.83418, -104.82497],
    [40.586345, -105.075813],
    [40.14055556, -105.13111111], [38.83418, -104.82497]];

  testPosAtlas.setState({markerPosition: markerPositions});
  let actualOutput = testPosAtlas.instance().getPositions();
  expect(actualOutput).toEqual(expectedOutput);
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

  Promise.resolve().then(r => expect(testDeleteAtlas.state.markerPosition).toEqual(expectedOutput));

}

test("Testing Atlas's Initial State", testInitialAppState);
test("Testing Atlas's Handle Input", testInitialHandleInput);
test("Testing Atlas's Store Input Position",testStoreInputPosition);
test("Testing Atlas's getPositions method",testGetPositionsOutput);
test("Testing Atlas's position validation", testValidatePos);
test("Testing Atlas's deleteMarker method", testDeleteMarker);
test("Testing Atlas's storeInputPosition", testStoreInputPosition);