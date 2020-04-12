import './enzyme.config.js'
import React from 'react'
import {mount, shallow} from 'enzyme'

import LoadFileButton from "../src/components/Atlas/LoadFileButton.js";
import * as tripSchema from "../schemas/TIPConfigRequestSchema";
import * as distSchema from "../schemas/DistanceRequest";
import {PROTOCOL_VERSION} from "../src/components/Constants";
import {readString} from "react-papaparse";

const lfb = new LoadFileButton();



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


function testJSON(){
    expect(!(lfb.testJsonFile(jsonTemp,distSchema))).toEqual(true);
    expect(lfb.testJsonFile(jsonTemp,tripSchema)).toEqual(false);
}

function csvParser(){
    let data = "name,latitude,longitude\n" +
        "Paris,48.8566,2.3522\n" +
        "Tokyo,35.6804,139.7690\n" +
        "Point Nemo,-48.8767,-123.3933";

    let data2 = "name,latitude\n" +
        "Paris,48.8566,2.3522\n" +
        "Tokyo,35.6804,139.7690\n" +
        "Point Nemo,-48.8767,-123.3933";

    expect(lfb.seperateCsvDataIntoJSON(readString(data))!=jsonTemp).toEqual(true);
    expect(lfb.seperateCsvDataIntoJSON(readString(data2))!=jsonTemp).toEqual(true);
}



test("LFB, Testing JSON Validation",testJSON);
test("LFB, Testing the csv parsers correctness",csvParser);