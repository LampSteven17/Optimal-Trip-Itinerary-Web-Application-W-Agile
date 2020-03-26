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
  let pointTest1 = [[0,0],[0,100]];
  let expectedResult1 = [
    {
      "type": {},
      "key": "1577959247181.1738",
      "ref": null,
      "props": {
        "color": "red",
        "positions": [[0, 0],[0, 100]]
      },
      "_owner": null,
      "_store": {}
    }
  ];
  let pointTest2 = [[0,140],[0,-20]];
  let expectedResult2 = [
    {
      "type": {},
      "key": "389479381985.7301",
      "ref": null,
      "props": {
        "color": "red",
        "positions": [[0, -140], [0, -310]]
      },
      "_owner": null,
      "_store": {}
    },
    {
      "type": {},
      "key": "1431468603742.495",
      "ref": null,
      "props": {
        "color": "red",
        "positions": [[0, 220],[0, 50]]
      },
      "_owner": null,
      "_store": {}
    }
  ];
  let pointTest3 = [[0, -160], [0, 70]];
  let expectedResult3 = [
    {
      "type": {},
      "key": "838607087921.1139",
      "ref": null,
      "props": {
        "color": "red",
        "positions": [[0, -160],[0, -290]]
      },
      "_owner": null,
      "_store": {}
    },
    {  
      "type": {},
      "key": "1111724324699.8079",
      "ref": null,
      "props": {
        "color": "red",
        "positions": [[0, 200],[0, 70]]
      },
      "_owner": null,
      "_store": {}
    }
  ];
}

test("Testing Atlas's Initial State", testInitialAppState);
test("Testing Atlas's Handle Input", testInitialHandleInput);
test("Testing Atlas's Store Input Position",testStoreInputPosition);
test("Testing Atlas's getPositions method",testGetPositionsOutput);
