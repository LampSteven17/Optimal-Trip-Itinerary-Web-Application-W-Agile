import React, { createRef, Component } from "react";
import "../tcowebstyle.css";
import { List, arrayMove } from "react-movable";
import {
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

/***************
 * For full References Vist: https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
 * Used Basic Structure and Outlines for Class Dev
 * Used React implemented JS HEader
 * Formatting is from included CSS
 */

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: this.props.dests,
      firstTime: true,
      previousProps: this.props.dests,
      showModal: false,
    };
    this.ref = createRef();
    this.filterBySearch = this.filterBySearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  render() {
    return (
      <div
        key={this.props.dests}
        className="csu-branding"
        style={{
          paddingTop: "1em",
          justifyContent: "center",
        }}
        ref={this.ref}
      >
        <Input
          placeholder="Search"
          onInput={(t) => this.filterBySearch(t.target.value)}
        />
        {this.createList()}
      </div>
    );
  }

  createList() {
    return (
      <List
        lockVertically={true}
        ref={this.ref}
        values={this.state.searched}
        onChange={({ oldIndex, newIndex }) =>
          this.updateOrder(oldIndex, newIndex)
        }
        renderList={({ children, props, isDragged }) => {
          return this.renderTable(children, props, isDragged);
        }}
        renderItem={({ value, props, isDragged, isSelected }) => {
          const row = this.renderRow(value, props, isDragged, isSelected);
          return isDragged ? (
            <table {...props}>
              <tbody style={{ offset: 3, size: 6 }}>{row}</tbody>
            </table>
          ) : (
            row
          );
        }}
      />
    );
  }

  /******
   * repurposed from levelupTuts online youtube on search filters and react js
   * https://youtu.be/OlVkYnVXPl0
   */
  filterBySearch(searchText) {
    this.setState({ firstTime: false });
    let filter = this.props.dests.filter((dest) => {
      return (
        dest.destination.toLowerCase().includes(searchText.toLowerCase()) ===
        true
      );
    });

    this.setState({ searched: filter });
  }

  updateOrder(oldIndex, newIndex) {
    let lastIndex = this.props.dests.length - 1;
    if (oldIndex === 0 && newIndex === lastIndex) {
      return;
    } else if (oldIndex === lastIndex && newIndex === 0) {
      return;
    } else if (oldIndex === lastIndex && newIndex === 1) {
      return;
    } else if (newIndex === lastIndex) {
      newIndex = 0;
    } else if (oldIndex === lastIndex) {
      oldIndex = 0;
    }
    let newOrder = arrayMove(this.props.dests, oldIndex, newIndex);

    this.props.handler(newOrder);
  }

  renderTable(children, props, isDragged) {
    return (
      <table
        className="table"
        style={{
          cursor: isDragged ? "grabbing" : undefined,
        }}
      >
        <thead>
          <tr>{this.renderHeader()}</tr>
        </thead>
        <tbody {...props}>{children}</tbody>
      </table>
    );
  }

  renderHeader() {
    let head = Object.keys(this.props.dests[0]);

    return head.map((key, index) => {
      if (key != "id" && key !== "lat" && key !== "lng") {
        return <th key={index}> {key.toUpperCase()} </th>;
      }
    });
  }

  renderRow(value, props, isDragged, isSelected) {
    const { id, destination, leg, total } = value;

    return (
      <tr
        {...props}
        style={{
          cursor: isDragged ? "grabbing" : "grab",
          backgroundColor: isDragged || isSelected ? "#EEE" : "#fafafa",
        }}
        key={id}
      >
        <td>
          {destination}
          {this.editButton(destination)}
        </td>
        <td>{leg}</td>
        <td>{total}</td>
      </tr>
    );
  }

  editButton(destination) {
    return (
      <span style={{ paddingLeft: "1em" }}>
        <Button
          size="sm"
          id="editToggle"
          className={"btn-csu"}
          onClick={() => this.toggleModal()}
        >
          Edit
        </Button>
        {this.renderModal(destination)}
      </span>
    );
  }

  renderModal(destination) {
    console.log(this.props.dests);
    let lat,lng = 0;
    this.props.dests.forEach(dest => {
      if (dest.destination === destination) {
        lat = dest.lat;
        lng = dest.lng;
      }
    });
    return (
      <Modal isOpen={this.state.showModal} toggle={() => this.toggleModal()}>
        <ModalHeader>Create Save File</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Destination Name</Label>
              <Input id="destName" defaultValue={destination}></Input>
            </FormGroup>
            <FormGroup>
              <span style={{width:"45%",float:"left"}}>
                <Label>Latitude</Label>
                <Input defaultValue={lat}></Input>
              </span>
              <span style={{width:"45%", float:"right"}}>
                <Label>Longitude</Label>
                <Input defaultValue={lng}></Input>
              </span>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.updateDestination()}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={() => this.toggleModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  updateDestination() {
    this.toggleModal();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.previousProps != props.dests) {
      state.previousProps = props.dests;
      state.firstTime = true;
    }

    if (state.searched !== props.dests && state.firstTime) {
      return {
        searched: props.dests,
      };
    }

    return null;
  }
}

export default Itinerary;
