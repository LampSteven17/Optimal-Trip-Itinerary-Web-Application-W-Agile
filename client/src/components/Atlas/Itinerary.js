import React, { createRef, Component } from "react";
import "../tcowebstyle.css";
import { List, arrayMove } from "react-movable";
import {Input, Table} from 'reactstrap';

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
      searchText: ""
    };
    this.ref = createRef();
    this.updateOrder = this.updateOrder.bind(this);
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
        <Input placeHolder="Search" onInput={t =>console.log(t.target.value)}/>
        <List
          lockVertically={true}
          ref={this.ref}
          values={this.props.dests}
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
      </div>
    );
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
        <td>{destination}</td>
        <td>{leg}</td>
        <td>{total}</td>
      </tr>
    );
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

  renderHeader() {
    let head = Object.keys(this.props.dests[0]);

    return head.map((key, index) => {
      if (key != "id" && key !== "lat" && key !== "lng") {
        return <th key={index}> {key.toUpperCase()} </th>;
      }
    });
  }
}

export default Itinerary;
