/**************************
 * Referenced https://medium.com/front-end-weekly/file-input-with-react-js-and-typescript-64dcea4b0a86
 * for basic construction of React input styling.
 *
 * For loading file data referenced https://medium.com/@ilonacodes/front-end-shorts-how-to-read-content-from-the-file-input-in-react-17f49b293909
 * Used the asynchronus method with file Reader.
 */

import React, {Component} from 'react';
import '../tcowebstyle.css';
import {Button, Input} from "reactstrap";
import * as tripFileSchema from "../../../schemas/TripFile";
import {isJsonResponseValid} from "../../utils/restfulAPI";
import {readString} from "react-papaparse";

import {PROTOCOL_VERSION} from "../Constants";

class LoadFileButton extends Component {

    constructor(props) {
        super(props);
        this.loadFileOnClick = this.loadFileOnClick.bind(this);

    }


    render() {
        return (
            <Input type="file" onChange={(files) => this.loadFileOnClick(files.target.files)}/>
        )
    }

    loadFileOnClick(files){
        let file = files.item(0);
        let extension  = file.name.substr(file.name.lastIndexOf('.') + 1).toLocaleLowerCase(); //I am truly sorry for this.
        this.props.action();
        switch(extension){
            case "json":
                this.jsonParser(file);
                break;
            case "csv":
                this.csvParser(file);
                break;
            default:
                window.alert("File '" + file.name
                    + "' has an unsupported file extension: '." + extension
                    + "'.\nSupported extensions are '.json' and '.csv'");
                break;
        }
    }


    jsonParser(file){
        let fileReader = new FileReader();

        const handleFileRead = (e) => {
            const content = fileReader.result;

            let data = JSON.parse(content);

            if (!this.testJsonFile(data, tripFileSchema)){
                window.alert("JSON file does not match schema\nPlease upload another file");
                return;
            }
            this.props.onChange(data);
        };

        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }

    csvParser(file){
        let fileReader = new FileReader();

        const handleFileRead = (e) => {
            const content = fileReader.result;

            let data = readString(content);


            let json = this.seperateCsvDataIntoJSON(data);
            this.props.onChange(json);

        };

        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }

    seperateCsvDataIntoJSON(dataObj){ //BACK TO MY OLD DASTARDLY WAYS IN THIS FUNCTION

        let jsonTemp = {
            "requestType"    : "trip",
            "requestVersion" : PROTOCOL_VERSION,
            "options"        : { "title":"csvFile", "earthRadius":"3959.0" },
            "places"         : [{"name": "", "latitude":  "0", "longitude": "0"}]
        };


        let nameIndex = -1;
        let latIndex = -1;
        let lngIndex = -1;

        for(let i=0; i<dataObj.data[0].length;i++){
            switch(dataObj.data[0][i].toLowerCase()) {
                case "name":
                    nameIndex=i;
                    break;

                case "latitude":
                    latIndex=i;
                    break;

                case "longitude":
                    lngIndex=i;
                    break;

                default:
                //do NOTHING GOOD CODE RIGHT? IM BEGINNING TO WONDER IF I AM A REAL PROGRAMMER
            }

        }

        if(nameIndex === -1 || latIndex===-1 || lngIndex===-1){
            return jsonTemp;
        }



        let places = [];
        for(let i=1; i<dataObj.data.length; i++){

            let row= dataObj.data[i];

            if(row.length === dataObj.data[1].length) { //MAKE SURE THEIR IS NOT WEIRD ANOMALIES, SHOULD ONLY BE AS MANY ENTRIES AS THE HEADERS
                places.push({"name": row[nameIndex], "latitude": row[latIndex], "longitude": row[lngIndex]});
            }
        }

        jsonTemp.places = places;



        return jsonTemp;
    }

    testJsonFile(body, schema) {
        if (!isJsonResponseValid(body, schema)) {
            console.error("FILE DOES NOT FIT SCHEMA");
            return false;
        }
        return true;
    }

}

export default LoadFileButton
