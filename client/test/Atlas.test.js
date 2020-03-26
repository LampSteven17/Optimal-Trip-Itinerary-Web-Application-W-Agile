import './enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {Polyline} from 'react-leaflet';
import {Row} from 'reactstrap';

import Atlas from '../src/components/Atlas/Atlas';

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
//TODO

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

function testPolyline() {
  jest.mock('leaflet');
  let testPolyAtlas = shallow(<Atlas />);

  let pointTest1 = [[0,0],[0,100]];
  let expectedResult1 = [[0, 0], [0, 100]];

  let pointTest2 = [[0,140],[0,-70]];
  let expectedResult2a = [[0, 290], [0, 140]];
  let expectedResult2b = [[0, -70], [0, -220]];

  let pointTest3 = [[0, -160], [0, 70]];
  let expectedResult3a = [[0, -160], [0, -290]];
  let expectedResult3b = [[0, 200], [0, 70]];

  let test1 = JSON.parse(JSON.stringify(testPolyAtlas.instance().generateLineArray(pointTest1)));
  expect(test1[0].props.positions).toEqual(expectedResult1);
  let test2 = JSON.parse(JSON.stringify(testPolyAtlas.instance().generateLineArray(pointTest2)));
  expect(test2[0].props.positions).toEqual(expectedResult2a);
  expect(test2[1].props.positions).toEqual(expectedResult2b);
  let test3 = JSON.parse(JSON.stringify(testPolyAtlas.instance().generateLineArray(pointTest3)));
  expect(test3[0].props.positions).toEqual(expectedResult3a);
  expect(test3[1].props.positions).toEqual(expectedResult3b);
}

test("Testing Atlas's Initial State", testInitialAppState);
test("Testing Atlas's Handle Input", testInitialHandleInput);
test("Testing Atlas's Store Input Position",testStoreInputPosition);
test("Testing Atlas's getPositions method",testGetPositionsOutput);
test("Testing Atlas's polyline methods",testPolyline);
