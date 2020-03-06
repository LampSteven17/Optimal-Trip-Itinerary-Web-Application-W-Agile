import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';

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

function testRoundTripLine() {
  let
}


test("Testing Atlas's Initial State", testInitialAppState);
test("Testing Atlas's Handle Input", testInitialHandleInput);
test("Testing Atlas's Store Input Position",testStoreInputPosition);
