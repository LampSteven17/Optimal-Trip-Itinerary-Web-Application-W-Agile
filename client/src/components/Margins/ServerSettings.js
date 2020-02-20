import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


import { sendServerRequest } from "../../utils/restfulAPI";
import { isJsonResponseValid } from "../../utils/restfulAPI";

import * as configSchema from "../../../schemas/TIPConfigResponseSchema";
import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";

export default class ServerSettings extends Component {


    constructor(props) {
        super(props);
        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: true,
            validSave: false,
            config: {}
        }
    }



    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                    <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                    {this.tabs_render()}
                    {this.renderActions()}
                </Modal>
            </div>
        );
    }

    /******************************************************
     * Code design/implementation for Tabs_render()
     * https://react-bootstrap.github.io/components/tabs/
     * react-bootstrap documentation tabs
     ******************************************************/
    tabs_render() {
        let currentServerName = this.getCurrentServerName();
        return (
            <Tabs defaultActiveKey={"server-settings"} transition={false} id="server-tab">
                <Tab eventKey={"server-settings"} title={"Server Settings"}>
                    {this.renderSettings(currentServerName)}
                </Tab>
                <Tab eventKey={"server-config"} title={"Server Configuration"}>
                    {this.render_table_server_config()}
                </Tab>
            </Tabs>
        )
    }

    /******************************************************
     * Code design/implementation for Tabs_render()
     * https://getbootstrap.com/docs/4.4/content/tables/#bordered-table
     * react-bootstrap documentation tables
     ******************************************************/
    render_table_server_config() {
        return <div className="panel panel-default">
            <table className={"table table-bordered"} xs={15}>
                <tbody>
                <tr>
                    <th scope={"row"}>Server Name</th>
                    <td scope={"row"}>{this.getCurrentServerName()}</td>
                </tr>
                <tr>
                    <th scope={"col"}>Request Version</th>
                    <td scope={"col"}>{PROTOCOL_VERSION}</td>
                </tr>
                <tr>
                    <th scope={"col"}>Request Type</th>
                    <td scope={"col"}>config</td>
                </tr>
                </tbody>
            </table>
        </div>
    }



    renderSettings(currentServerName) {
        return (
            <ModalBody>
                <Row className="m-2">
                    <Col>
                        Name: {currentServerName}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col xs={2}>
                        URL:
                    </Col>
                    <Col xs={10}>
                        {this.renderInputField()}
                    </Col>
                </Row>
            </ModalBody>
        );
    }

    renderInputField() {
        return(
            <Input onChange={(e) => this.updateInput(e.target.value)}
                   value={this.state.inputText}
                   placeholder={this.props.serverPort}
                   valid={this.state.validServer}
                   invalid={!this.state.validServer}
            />
        );
    }

    renderActions() {
        return (
            <ModalFooter>
                <Button color="secondary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button onClick={() =>
                {
                    this.props.updateServerConfig(this.state.config.body, this.state.inputText);
                    this.resetServerSettingsState();
                }}
                        disabled={!this.state.validSave}
                >
                    Save
                </Button>
            </ModalFooter>
        );
    }

    getCurrentServerName() {
        let currentServerName = this.props.serverSettings.serverConfig && this.state.validServer ? this.props.serverSettings.serverConfig.serverName : '';
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.body.serverName;
        }
        return currentServerName;
    }

    updateInput(value) {
        this.setState({inputText: value}, () => {
            if (this.shouldAttemptConfigRequest(value)) {
                sendServerRequest("config", value).then(config => {
                    this.processConfigResponse(config);
                    console.log(config);
                });
            } else {
                this.setState({validServer: false, validSave: false, config: {}});
            }
        });
    }

    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }

    processConfigResponse(config) {
        if(!isJsonResponseValid(config.body, configSchema) || config.statusCode !== HTTP_OK) {
            this.setState({validServer: false, validSave: false, config: false});
        } else {
            this.setState({validServer: true, validSave: true, config: config});
        }
    }

    resetServerSettingsState() {
        this.props.toggleOpen();
        this.setState({
            inputText: this.props.serverSettings.serverPort,
            validServer: true,
            validSave: false,
            config: false
        });
    }
}
