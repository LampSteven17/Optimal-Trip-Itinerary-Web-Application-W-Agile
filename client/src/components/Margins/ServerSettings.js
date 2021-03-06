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
            config: {},
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
        let configurationSettings = this.process_config_body();
        return <div className="panel panel-default">
            <table className={"table table-bordered"} xs={15}>
                <tbody>
                {this.render_table_because_code_climate_said_so("Server Name", this.getCurrentServerName())}
                {this.render_table_because_code_climate_said_so("Request Version", configurationSettings[0])}
                {this.render_table_because_code_climate_said_so("Request Type", configurationSettings[1])}
                {this.render_table_because_code_climate_said_so("Supported Requests", "config, distance, trip")}
                {this.render_table_because_code_climate_said_so("Optimization-Improvement", configurationSettings[3])}
                {this.render_table_because_code_climate_said_so("Optimization-Construction", configurationSettings[4])}
                {this.render_table_because_code_climate_said_so("Filter-Where", configurationSettings[5])}
                {this.render_table_because_code_climate_said_so("Filter-Type", configurationSettings[6])}


                </tbody>
            </table>
        </div>
    }

    render_table_because_code_climate_said_so(title, configSettings) {
        return (
            <tr>
                <th scope={"col"}>{title}</th>
                <td scope={"col"}>{configSettings}</td>
            </tr>
        );
    }

    process_config_body(){
        if (this.props.serverSettings.serverConfig && this.state.validServer) {
            let currentRequestVersion = this.props.serverSettings.serverConfig.requestVersion;
            let currentRequestType = this.props.serverSettings.serverConfig.requestType;
            let currentSupportedReq = this.props.serverSettings.serverConfig.supportedRequests;
            let currentOptImp = this.props.serverSettings.serverConfig.optimization.improvement;
            let currentOptCon = this.props.serverSettings.serverConfig.optimization.construction;
            let currentFilterWhere = this.props.serverSettings.serverConfig.filter.where;
            let currentFilterType = this.props.serverSettings.serverConfig.filter.type;
            return [currentRequestVersion, currentRequestType, currentSupportedReq.toString(),
                currentOptImp.toString(), currentOptCon.toString(),
                currentFilterWhere.toString(), currentFilterType.toString()];
        } else {
            return ["", "", "", "", "", "", ""];
        }
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
                });
            } else {
                this.setState({validServer: false,
                    validSave: false,
                    config: {}});
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
    }}

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
