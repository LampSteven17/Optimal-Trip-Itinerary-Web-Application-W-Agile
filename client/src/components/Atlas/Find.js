import React, { createRef, Component } from "react";
import "../tcowebstyle.css";
import {Label, Input} from "reactstrap";
class Find extends Component {
  constructor(props) {
    super(props);
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
        <Label><strong>Find Location</strong></Label>
        <Input
          placeholder="Search"
          onInput={(t) => this.findLocation(t.target.value)}
        />
      </div>
    );
  }

  findLocation(loc) {
    this.props.handler(loc);
  }
}

export default Find;
