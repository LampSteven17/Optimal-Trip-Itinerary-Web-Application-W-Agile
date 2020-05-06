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
class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findToggle: false,
      narrowFilter: ["airport", "balloonport", "heliport"],
    };
    this.findToggle = this.findToggle.bind(this);
    this.toggleNarrowFilter = this.toggleNarrowFilter.bind(this);
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
          <Collapse isOpen={this.state.findToggle}>
            <Card>
              <CardBody>
                <ButtonGroup>
                  <Button
                    onClick={() => this.toggleNarrowFilter("airport")}
                    outline={!this.state.narrowFilter.includes("airport")}
                  >
                    Airport
                  </Button>
                  <Button
                    onClick={() => this.toggleNarrowFilter("balloonport")}
                    outline={!this.state.narrowFilter.includes("balloonport")}
                  >
                    Balloonport
                  </Button>
                  <Button 
                    onClick={() => this.toggleNarrowFilter("heliport")}
                    outline={!this.state.narrowFilter.includes("heliport")}
                  >
                    Heliport
                  </Button>
                </ButtonGroup>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </div>
    );
  }

  findLocation(loc) {
    this.props.handler(loc);
  }

  findToggle() {
    this.setState({ findToggle: !this.state.findToggle });
  }

  toggleNarrowFilter(place) {
    let tmpNarrowFilter = this.state.narrowFilter;
    if (tmpNarrowFilter.includes(place)) {
      tmpNarrowFilter = tmpNarrowFilter.filter(pl => pl !== place);
      this.setState({ narrowFilter: tmpNarrowFilter });
    }
    else {
      tmpNarrowFilter.push(place);
      this.setState({ narrowFilter: tmpNarrowFilter });
    }
    console.log(tmpNarrowFilter);
  }
}

export default Find;
