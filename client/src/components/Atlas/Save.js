import React, {Component} from 'react';
import '../tcowebstyle.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class Save extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  render() {
    return(
      <div>
        <Button size="md" className={"btn-csu"} onClick={() => this.toggleModal()}>Save Itinerary</Button>
        <Modal isOpen={this.state.showModal} toggle={() => this.toggleModal()}>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
           <Button color="primary" onClick={() => this.toggleModal()}>Save</Button>{' '}
           <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  toggleModal() {
      this.setState({
       showModal: !this.state.showModal
     })
  }
}

export default Save
