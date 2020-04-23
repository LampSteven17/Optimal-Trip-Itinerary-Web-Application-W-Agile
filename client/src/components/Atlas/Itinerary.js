import React, {createRef, Component} from 'react';
import '../tcowebstyle.css';
import {Table} from 'reactstrap';
import {
    List,
    arrayMove
} from 'react-movable';


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
      dests: this.props.dests,
    };

    this.ref = React.createRef();
    this.updateOrder = this.updateOrder.bind(this);
  }

  render() {
    const ItineraryTable = React.forwardRef((props, ref) => (
      <Table
        responsive
        className="table"
      >
        <thead>
          <tr>{this.renderHeader()}</tr>
        </thead>
        <tbody {...props.data}>{props.children}</tbody>
      </Table>
    ));
    return (
      <div
        key={this.props.dests}
        className="csu-branding"
        style={{
          paddingTop: "1em",
          display: "flex",
          justifyContent: "center",
        }}
        ref={this.ref}
      >
        <List
          values={this.state.dests}
          onChange={({ oldIndex, newIndex }) =>
            this.updateOrder(oldIndex, newIndex)
          }
          renderList={({ children, props, isDragged }) => (
            <ItineraryTable
              children={children}
              data={props}
              style={{
                cursor: isDragged ? "grabbing" : undefined,
              }}
            ></ItineraryTable>
          )}
          renderItem={({ value, props, isDragged, isSelected }) => {
            const row = this.renderRow(value, props, isDragged, isSelected);
            return isDragged ? (
              <Table {...props}>
                <tbody style={{ offset: 3, size: 6 }}>{row}</tbody>
              </Table>
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
      <Table
        ref={this.ref}
        responsive
        className="table"
        style={{
          cursor: isDragged ? "grabbing" : undefined,
        }}
      >
        <thead>
          <tr>{this.renderHeader()}</tr>
        </thead>
        <tbody {...props}>{children}</tbody>
      </Table>
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

  static getDerivedStateFromProps(props, state) {
    if (props.dests !== state.dests) {
      return {
        dests: props.dests,
      };
    }

    return null;
  }

  updateOrder(oldIndex, newIndex) {
    if (newIndex === this.state.dests.length - 1) {
      newIndex = 0;
    }
    this.props.handler(arrayMove(this.state.dests, oldIndex, newIndex));
  }

  renderData() {
    return this.state.dests.map((dest) => {
      const { id, destination, leg, total } = dest;

      return (
        <tr key={id}>
          <td>{destination}</td>
          <td>{leg}</td>
          <td>{total}</td>
        </tr>
      );
    });
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

export default Itinerary
