/**************************
 * Referenced https://medium.com/front-end-weekly/file-input-with-react-js-and-typescript-64dcea4b0a86
 * for basic construction of React input styling.
 */

import React, {Component} from 'react';
import '../tcowebstyle.css';
import {Button, Input} from "reactstrap";

class LoadFileButton extends Component {

    constructor(props) {
        super(props);
        this.loadFileOnClick = this.loadFileOnClick.bind(this)

    }


    render() {
        return (
            <Input type="file" onChange={(file) => this.loadFileOnClick(file.target.files)}/>
        )
    }

    loadFileOnClick(files){
        console.log(files);

    }





}

export default LoadFileButton