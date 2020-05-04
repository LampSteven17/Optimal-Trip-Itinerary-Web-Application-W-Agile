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
      updatedLat: null,
      updatedLng: null,
      updatedName: null,
    };
    this.ref = createRef();
    this.filterBySearch = this.filterBySearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
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
      if (key != "id" && key !== "lat" && key !== "lng" && key !== "modal") {
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
          onClick={() => this.toggleModal(destination)}
        >
          Edit
        </Button>
        {this.renderModal(destination)}
      </span>
    );
  }

  renderModal(destination) {
    let lat,
      lng = 0;
    let modalState;
    this.state.searched.forEach((dest, i) => {
      if (dest.destination === destination) {
        lat = dest.lat;
        lng = dest.lng;
        modalState = this.state.searched[i].modal;
      }
    });
    return (
      <Modal isOpen={modalState} toggle={() => this.toggleModal(destination)}>
        <ModalHeader>Update Marker</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Destination Name</Label>
              <Input
                id="destName"
                defaultValue={destination}
                onInput={(e) => this.handleName(e.target.value)}
              ></Input>
            </FormGroup>
            <FormGroup>
              <span style={{ width: "45%", float: "left" }}>
                <Label>Latitude</Label>
                <Input
                  defaultValue={lat}
                  onInput={(e) => this.handleLat(e.target.value)}
                ></Input>
              </span>
              <span style={{ width: "45%", float: "right" }}>
                <Label>Longitude</Label>
                <Input
                  defaultValue={lng}
                  onInput={(e) => this.handleLng(e.target.value)}
                ></Input>
              </span>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => this.updateDestination(destination)}
          >
            Save
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => this.toggleModal(destination)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  toggleModal(destination, resetLatLng = true) {
    let newSearched = this.state.searched;
    newSearched.forEach((dest, i) => {
      if (dest.destination === destination)
        newSearched[i].modal = !newSearched[i].modal;
    });
    this.setState({ searched: newSearched });
    if (resetLatLng) {
      this.setState({ handleLat: null, handleLng: null, handleName: null });
    }
  }

  updateDestination(destination) {
    this.toggleModal(destination, false);
    let name = this.state.updatedName;
    let lat = this.state.updatedLat;
    let lng = this.state.updatedLng;
    let newSearched = this.state.searched;
    newSearched.forEach(item => {
      if (item.destination === destination) {
        if (name !== null) item.destination = name;
        if (lat !== null) item.lat = Number(lat);
        if (lng !== null) item.lng = Number(lng);
      }
    });
    this.props.handler(newSearched);
    this.setState({ handleLat: null, handleLng: null, handleName: null });
  }

  handleName(e) {
    this.setState({ updatedName: e });
  }

  handleLat(e) {
    this.setState({ updatedLat: e });
  }

  handleLng(e) {
    this.setState({ updatedLng: e });
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
