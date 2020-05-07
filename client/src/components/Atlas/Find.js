import React, { createRef, Component } from "react";
import "../tcowebstyle.css";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Collapse,
  Label,
  Input,
} from "reactstrap";
import AirportIcon from '@material-ui/icons/LocalAirport';
import HeliIcon from '@material-ui/icons/Toys';
import BalloonIcon from '@material-ui/icons/NatureRounded';



class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findToggle: false,
      loc: "",
      narrowFilter: ["airport", "balloonport", "heliport"],
      where: "",
    };
    this.findToggle = this.findToggle.bind(this);
    this.findLocation = this.findLocation.bind(this);
    this.toggleNarrowFilter = this.toggleNarrowFilter.bind(this);
    this.setWhere = this.setWhere.bind(this);
  }

  render() {
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
        <Input
          placeholder="Search"
          onInput={(t) => this.findLocation(t.target.value)}
        />
        <div style={{ paddingTop: "1em" }}>
          <Button className={"btn-csu"} onClick={() => this.findToggle()}>
            Find Filter
          </Button>
          {this.renderFilter()}
        </div>
      </div>
    );
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
              <Label><strong>Where:</strong></Label>
            </div>
            <div style={{ width: "50%"}}>
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
          <AirportIcon/>
        </Button>
        <Button
          onClick={() => this.toggleNarrowFilter("balloonport")}
          outline={!this.state.narrowFilter.includes("balloonport")}
        >
          <BalloonIcon/>
        </Button>
        <Button
          onClick={() => this.toggleNarrowFilter("heliport")}
          outline={!this.state.narrowFilter.includes("heliport")}
        >
          <HeliIcon/>
        </Button>
      </ButtonGroup>
    );
  }

  setWhere(where) {
    this.setState({where: where});
    this.findLocation(this.state.loc);
  }

  findLocation(loc) {
    this.setState({loc: loc});
    this.props.handler(loc, this.state.narrowFilter, this.state.where);
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
