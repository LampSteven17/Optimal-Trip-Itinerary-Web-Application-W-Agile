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

import {save} from 'save-file';
const validFilename = require('valid-filename');

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
      <Button size="md" className={"btn-csu"} onClick={() => this.toggleModal()}>Save Itinerary</Button>
      <Modal isOpen={this.state.showModal} toggle={() => this.toggleModal()}>
        <ModalHeader>
          Save Map
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input invalid={this.state.isNameInvalid} id="saveName" placeholder="filename" onInput={e => this.updateFilename(e.target.value)}></Input>
            </FormGroup>
            <FormGroup>
              <Label>File Type</Label>
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
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.saveFile()}>Save</Button>{' '}
          <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>)
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  updateFilename(newFilename) {
    this.setState({
      filename: newFilename
    });
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }

  updateDropdownHeader(newHeader) {
    this.setState({
      dropdownHeader: newHeader
    });
  }

  saveFile() {
    console.log(this.state.filename);
    console.log(this.state.dropdownHeader);

    if (!validFilename(this.state.filename)) {
      this.setState({isNameInvalid: true});
    }
    else {
      this.toggleModal();
    }
  }
}

export default Save
