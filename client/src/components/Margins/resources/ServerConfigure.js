import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { sendServerRequest } from "../../utils/restfulAPI";
import { isJsonResponseValid } from "../../utils/restfulAPI";

import * as configSchema from "../../../schemas/TIPConfigResponseSchema";
import { HTTP_OK } from "../Constants";

export default class ServerConfigure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: true,
            validSave: false,
            config: {}
            // This needs to be updated for parameters ???
        }
    }

    render() {
        let currentServerName = this.getCurrentServerName();
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                    <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                    {this.renderSettings(currentServerName)}
                    {this.renderActions()}
                </Modal>
            </div>
        );
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


    // KEEP  this seems fine, don't know if we need a save button though
    renderActions() {
        return (
            <ModalFooter>
                <Button color="secondary" onClick={() => this.resetServerSettingsState()}>Close</Button>
                <!--
                <Button onClick={() =>
                {
                    this.props.updateServerConfig(this.state.config.body, this.state.inputText);
                    this.resetServerSettingsState();
                }}
                        disabled={!this.state.validSave}
                >
                    Save
                </Button>
                -->
            </ModalFooter>
        );
    }
/*
    getCurrentServerName() {
        let currentServerName = this.props.serverSettings.serverConfig && this.state.validServer ? this.props.serverSettings.serverConfig.serverName : '';
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.body.serverName;
        }
        return currentServerName;
    }
    // should be able to be called from another class ServerSettings.js
 */

    // NOT SURE depends on params
    // Do we even need input?
    updateInput(value) {
        this.setState({inputText: value}, () => {
            if (this.shouldAttemptConfigRequest(value)) {
                sendServerRequest("config", value).then(config => {
                    this.processConfigResponse(config);
                });
            } else {
                this.setState({validServer: false, validSave: false, config: {}});
            }
        });
    }

    // NOT SURE depends on params
    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }

    // NOT SURE depends on params
    processConfigResponse(config) {
        if(!isJsonResponseValid(config.body, configSchema) || config.statusCode !== HTTP_OK) {
            this.setState({validServer: false, validSave: false, config: false});
        } else {
            this.setState({validServer: true, validSave: true, config: config});
        }
    }

    // KEEP
    // This still tracks the state of the window open, still good
    resetServerConfigureState() {
        this.props.toggleOpen();
        this.setState({
            inputText: this.props.serverSettings.serverPort,
            validServer: true,
            validSave: false,
            config: false
        });
    }
}
