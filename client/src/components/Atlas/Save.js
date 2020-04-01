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

class Save extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showDropdown: false
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
              <Input id="saveName" placeholder="filename"></Input>
            </FormGroup>
            <FormGroup>
              <Label>File Type</Label>
              <Dropdown isOpen={this.state.showDropdown} toggle={() => this.toggleDropdown()}>
                <DropdownToggle caret>
                  Type
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>.json</DropdownItem>
                  <DropdownItem>.csv</DropdownItem>
                  <DropdownItem>.kml</DropdownItem>
                  <DropdownItem>.svg</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.toggleModal()}>Save</Button>{' '}
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

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }
}

export default Save
