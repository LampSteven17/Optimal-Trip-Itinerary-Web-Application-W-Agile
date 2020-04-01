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

    console.log(props.dests);

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

  async saveFile() {
    if (!validFilename(this.state.filename)) {
      this.setState({isNameInvalid: true});
    }
    else {
      this.toggleModal();
      if (this.state.dropdownHeader === ".json") {
        if (Object.keys(this.props.dests).length === 0) {
          console.log("in here");
          await save({}, this.state.filename + this.state.dropdownHeader);
        }
        else {
          await save(JSON.stringify(this.props.dests), this.state.filename + this.state.dropdownHeader);
        }
      }
      else if (this.state.dropdownHeader === ".csv") {

      }
      else if (this.state.dropdownHeader === ".kml") {

      }
      else {

      }
    }
  }
}

export default Save
