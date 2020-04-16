import React, {Component} from 'react';
import '../tcowebstyle.css';
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

const validFilename = require('valid-filename');
import { jsonToCSV } from 'react-papaparse';
import {PROTOCOL_VERSION} from "../Constants";

class Save extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      filename: null,
      showDropdown: false,
      dropdownHeader: ".json",
      isNameInvalid: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);

  }

  render() {
    return (<div>
      <Button size="md" className={"btn-csu"} onClick={() => this.toggleModal()}>Save</Button>
      <Modal isOpen={this.state.showModal} toggle={() => this.toggleModal()}>
        <ModalHeader>
          Create Save File
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input invalid={this.state.isNameInvalid} id="saveName" placeholder="filename" onInput={e => this.updateFilename(e.target.value)}></Input>
            </FormGroup>
            <FormGroup>
              <Label>File Type</Label>
              {this.renderDropdown()}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.saveFile()}>Save</Button>{' '}
          <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>);
  }

  renderDropdown() {
    return (
      <Dropdown isOpen={this.state.showDropdown} toggle={() => this.toggleDropdown()}>
        <DropdownToggle caret>
          {this.state.dropdownHeader}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.updateDropdownHeader(".json")}>.json</DropdownItem>
          <DropdownItem onClick={() => this.updateDropdownHeader(".csv")}>.csv</DropdownItem>
          <DropdownItem onClick={() => this.updateDropdownHeader(".kml")}>.kml</DropdownItem>
          <DropdownItem onClick={() => this.updateDropdownHeader(".svg")}>.svg</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });

    return true;
  }

  updateFilename(newFilename) {
    this.setState({
      filename: newFilename
    });

    return true;
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });

    return true;
  }

  updateDropdownHeader(newHeader) {
    this.setState({
      dropdownHeader: newHeader
    });

    return true;
  }

  async saveFile() {
    if (!validFilename(this.state.filename)) {
      this.setState({isNameInvalid: true});
    }
    else {
      this.toggleModal();
      let saveJson = this.createJson();
      switch (this.state.dropdownHeader) {
        case ".json":
          this.downloadFile('txt/json', this.state.filename + this.state.dropdownHeader, JSON.stringify(saveJson));
          break;
        case ".csv":
          let placesArray = JSON.stringify(saveJson.places);
          this.downloadFile('txt/csv', this.state.filename + this.state.dropdownHeader, jsonToCSV(placesArray));
          break;
        case ".kml":
          break;
        case ".svg":
          break;
      }
    }
  }
  createJson() {
    let saveJson = {
        requestType: "trip",
        requestVersion: PROTOCOL_VERSION,
        options: {
          title:"Trip",
          earthRadius:"3959.0",
          optimization: {
            construction: "none",
            improvement: "none",
            response: "1"
          }
        },
        places: []
    };
    this.props.mpArray.forEach((item, i) => {
      saveJson.places.push({name: this.props.names[i].name, latitude: item.lat.toString(), longitude: item.lng.toString()});
    });

    return saveJson;
  }

  downloadFile(fileType, fileName, fileText) {
    let file = new Blob([fileText], {type: fileType});
    let a = document.createElement('a'),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    }, 0);

    return true;
  }


}

export default Save
