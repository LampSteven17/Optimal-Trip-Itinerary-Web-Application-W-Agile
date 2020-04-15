import './enzyme.config.js';
import {shallow, mount} from "enzyme";
import React from "react";

import MarkerPolyline from "../src/components/Atlas/MarkerPolyline";

function testPolyline() {
    jest.mock('leaflet');

    let markerPositions = [{lat: 38.83418, lng: -104.82497, id: 0},
        {lat: 40.586345, lng: -105.075813, id: 1},
        {lat: 40.14055556, lng: -105.13111111, id: 2}];

    let testPoly = shallow(<MarkerPolyline markerPosition={markerPositions} />);

    let pointTest1 = [[0,0],[0,100]];
    let expectedResult1 = [[0, 0], [0, 100]];

    let pointTest2 = [[0,140],[0,-70]];
    let expectedResult2a = [[0, 290], [0, 140]];
    let expectedResult2b = [[0, -70], [0, -220]];

    let pointTest3 = [[0, -160], [0, 70]];
    let expectedResult3a = [[0, -160], [0, -290]];
    let expectedResult3b = [[0, 200], [0, 70]];

    let test1 = JSON.parse(JSON.stringify(testPoly.instance().generateLineArray(pointTest1)));
    expect(test1[0].props.positions).toEqual(expectedResult1);
    let test2 = JSON.parse(JSON.stringify(testPoly.instance().generateLineArray(pointTest2)));
    expect(test2[0].props.positions).toEqual(expectedResult2a);
    expect(test2[1].props.positions).toEqual(expectedResult2b);
    let test3 = JSON.parse(JSON.stringify(testPoly.instance().generateLineArray(pointTest3)));
    expect(test3[0].props.positions).toEqual(expectedResult3a);
    expect(test3[1].props.positions).toEqual(expectedResult3b);
}


function testGetPositionsOutput() {
    jest.mock('react-leaflet');

    let markerPositions = [{lat: 38.83418, lng: -104.82497, id: 0},
        {lat: 40.586345, lng: -105.075813, id: 1},
        {lat: 40.14055556, lng: -105.13111111, id: 2}];

    let testPos = shallow(<MarkerPolyline markerPosition={markerPositions} />);


    let expectedOutput = [[38.83418, -104.82497],
        [40.586345, -105.075813],
        [40.14055556, -105.13111111], [38.83418, -104.82497]];

    let actualOutput = testPos.instance().getPositions();
    expect(actualOutput).toEqual(expectedOutput);
}


test("Testing MarkerPolyline's generateLineArray method", testPolyline);
test("Testing MarkerPolyline's getPositions method", testGetPositionsOutput);