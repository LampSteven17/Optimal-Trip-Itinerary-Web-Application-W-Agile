import React, { createRef, Component } from "react";
import "../tcowebstyle.css";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Collapse,
  Container,
  Label,
  Input,
  Row,
  Table,
} from "reactstrap";
import AirportIcon from "@material-ui/icons/LocalAirport";
import HeliIcon from "@material-ui/icons/Toys";
import BalloonIcon from "@material-ui/icons/NatureRounded";

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findToggle: false,
      loc: "",
      narrowFilter: ["airport", "balloonport", "heliport"],
      where: "",
      showLocations: false,
    };

    this.showLocations = false;
    this.findToggle = this.findToggle.bind(this);
    this.findLocation = this.findLocation.bind(this);
    this.toggleNarrowFilter = this.toggleNarrowFilter.bind(this);
    this.setWhere = this.setWhere.bind(this);
  }

  render() {
    this.showLocations = this.props.places.length > 0;
    return (
      <div
        className="csu-branding"
        style={{
          paddingTop: "1em",
          justifyContent: "center",
        }}
      >
        <Label>
          <strong>Find Location</strong>
        </Label>
        <Container style={{ width: "100%" }}>
          <Row>
            <Input
              style={{ width: "80%" }}
              placeholder="Search"
              onInput={(t) => this.setLocation(t.target.value)}
            />
            <Button
              className={"btn-csu"}
              onClick={() => this.findLocation(this.state.loc)}
            >
              Search
            </Button>
          </Row>
        </Container>
        <div style={{ paddingTop: "1em" }}>
          <Button className={"btn-csu"} onClick={() => this.findToggle()}>
            Find Filter
          </Button>
          {this.renderFilter()}
        </div>
        {this.renderPlaces()}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.places.length > 0) {
      this.setState({ showLocations: true });
    } else {
      this.setState({ showLocations: false });
    }
  }

  renderFilter() {
    return (
      <Collapse isOpen={this.state.findToggle}>
        <Card>
          <CardBody>
            <div style={{ width: "100%" }}>
              <Label>
                <strong>Filter</strong>
              </Label>
            </div>
            <div>{this.filterButtons()}</div>
            <div style={{ width: "100%", paddingTop: "1em" }}>
              <Label>
                <strong>Where:</strong>
              </Label>
            </div>
            <div style={{ width: "50%" }}>
              <Input
                placeholder="Place"
                onInput={(t) => this.setWhere(t.target.value)}
              />
            </div>
          </CardBody>
        </Card>
      </Collapse>
    );
  }

  filterButtons() {
    return (
      <ButtonGroup>
        <Button
          onClick={() => this.toggleNarrowFilter("airport")}
          outline={!this.state.narrowFilter.includes("airport")}
        >
          <AirportIcon />
        </Button>
        <Button
          onClick={() => this.toggleNarrowFilter("balloonport")}
          outline={!this.state.narrowFilter.includes("balloonport")}
        >
          <BalloonIcon />
        </Button>
        <Button
          onClick={() => this.toggleNarrowFilter("heliport")}
          outline={!this.state.narrowFilter.includes("heliport")}
        >
          <HeliIcon />
        </Button>
      </ButtonGroup>
    );
  }

  renderPlaces() {
    return (
      <Collapse isOpen={this.state.showLocations}>
        <Card>
          <CardBody>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>{this.buildTable(this.props.places)}</tbody>
            </Table>
          </CardBody>
        </Card>
      </Collapse>
    );
  }

  buildTable(array) {
    let tableData = [];
    array.forEach((place) => {
      tableData.push(
        <tr key={Date.now() * Math.random()}>
          <td>{place.name}</td>
          <td>{Number(place.latitude).toFixed(5)}</td>
          <td>{Number(place.longitude).toFixed(5)}</td>
          <td>
            <Button onClick={() => this.addMarker(place)}>+</Button>
          </td>
        </tr>
      );
    });

    return tableData;
  }

  addMarker(place) {
    this.props.addMarker(place);
  }

  setWhere(where) {
    this.setState({ where: where });
    this.findLocation(this.state.loc);
  }

  findLocation(loc) {
    if (loc === "") {
      this.setState({ showLocations: false });
    }
    this.setState({ loc: loc });
    this.props.handler(loc, this.state.narrowFilter, this.state.where);
  }

  setLocation(loc) {
    this.setState({ loc: loc });
  }

  findToggle() {
    this.setState({ findToggle: !this.state.findToggle });
  }

  toggleNarrowFilter(place) {
    let tmpNarrowFilter = this.state.narrowFilter;
    if (tmpNarrowFilter.includes(place)) {
      tmpNarrowFilter = tmpNarrowFilter.filter((pl) => pl !== place);
      this.setState({ narrowFilter: tmpNarrowFilter });
    } else {
      tmpNarrowFilter.push(place);
      this.setState({ narrowFilter: tmpNarrowFilter });
    }
  }
}

export default Find;
