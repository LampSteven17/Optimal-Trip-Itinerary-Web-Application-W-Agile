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
        //READ CSV HERE
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
