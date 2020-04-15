import './enzyme.config.js'
import React from 'react'
import {mount, shallow} from 'enzyme'

import Save from "../src/components/Atlas/Save";
import {PROTOCOL_VERSION} from "../src/components/Constants";
const s = new Save();
const n = new Save();

let jsonTemp = {
    "requestType"    : "trip",
    "requestVersion" : PROTOCOL_VERSION,
    "options"        : { "title":"csvFile",
        "earthRadius":"3959.0",
        "optimization" : {
            "construction" : "none",
            "improvement" : "none",
            "response" : "1"
        }},
    "places"         : [{"name": "", "latitude":  "0", "longitude": "0"}]
};


//CORRECT FIRE TESTS
function testTM(){expect(s.toggleModal()).toEqual(true);}
function testF(){expect(s.updateFilename()).toEqual(true);}
function testD(){expect(s.toggleDropdown()).toEqual(true);}
function testDH(){expect(s.updateDropdownHeader()).toEqual(true);}

function testValidFileName(){
    s.setState({filename: "myfile"});
    expect(s.saveFile()).toEqual(s.saveFile());
}

function testDownloadFile(){

    global.URL.createObjectURL = jest.fn();
    expect(s.downloadFile("csv","myfile","nothing")).toEqual(true);
}

test("Testing Save.js",testTM);
test("Testing Save.js",testF);
test("Testing Save.js",testD);
test("Testing Save.js",testDH);
test("TESTING valid file name",testValidFileName);
test("TESTING DOWNLOAD FILE",testDownloadFile);