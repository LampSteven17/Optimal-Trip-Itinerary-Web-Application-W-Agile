import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import {CLIENT_TEAM_NAME} from "../Constants";
import '../tcowebstyle.css';

import steveImg from "./teamImages/StevenLampImg.jpg";
import austImg from "./teamImages/AustinSorianoImg.jpg";
import cadeImg from "./teamImages/cade_image.jpg";
import ryanImg from "./teamImages/Ryan_Picture.jpg";




export default class About extends Component {

    render() {
        return (<Container id="about">
            <Row>
                <Col>
                    <h2 className="font-weight-bold">
                        {CLIENT_TEAM_NAME}
                    </h2>
                    {this.renderTeamStatement()}
                </Col>
                <Col id="closeAbout" xs='auto'>
                    <Button className='btn-csu w-100' onClick={this.props.closePage} xs={1}>
                        Close
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {this.renderAustinCard()}
                </Col>
                <Col>
                    {this.renderSteveCard()}
                </Col>
                <Col>
                    {this.renderCadeCard()}
                </Col>
                <Col>
                    {this.renderRyanCard()}
                </Col>
            </Row>
        </Container>)
    }


    renderRyanCard() {
        return(
            <Card style={{
                width: '15rem'
            }}>
                <CardImg top width="100%" src={ryanImg} alt="blank"/>
                <CardBody>
                    <CardTitle><strong>Ryan Kughn</strong></CardTitle>
                    <CardText>
                        My name is Ryan and I am currently a junior at CSU.  I am
                        majoring in computer science with a minor in mathematics.  I am
                        currently working towards becoming a software engineer in the future.
                        I enjoy skateboarding, music, and video games in my free time.
                    </CardText>
                </CardBody>
            </Card>
        )
    }

    renderSteveCard() {
        return (
            <Card style={{
                width: '15rem'
            }}>
                <CardImg top width="100%" src={steveImg} alt="blank"/>
                <CardBody>
                    <CardTitle><strong>Steven Lamp</strong></CardTitle>
                    <CardText>
                        Hello, my name is Steven! I am a Junior CS student at CSU. I
                        avidly pursue topics in CyberSecurity. I am also a drummer for local bands
                        and enjoy any and all nerdy things! If you see me out and about, give me a shout!
                    </CardText>
                </CardBody>
            </Card>
        )
    }

    renderAustinCard() {
        return (
            <Card style={{
                width: '15rem'
            }}>
                <CardImg top width="100%" src={austImg} alt="blank"/>
                <CardBody>
                    <CardTitle><strong>Austin Soriano</strong></CardTitle>
                    <CardText>
                        Hello my name is Austin. I am currently a Junior at Colorado
                        State University and Majoring in Computer Science. In my free
                        time I enjoy Snowboarding and Mountain Biking.
                    </CardText>
                </CardBody>
            </Card>
        )
    }

    renderCadeCard() {
        return (
            <Card style={{
                width: '15rem'
            }}>
                <CardImg top width="100%" src={cadeImg} alt="blank"/>
                <CardBody>
                    <CardTitle><strong>Cade McCumber</strong></CardTitle>
                    <CardText>
                        My name is Cade, currently a Junior undergrad at CSU pursuing Computer Science.
                        I occasionally enjoy exercise, cooking and arguing about art and music with everyone
                        around me.
                    </CardText>
                </CardBody>
            </Card>
        )
    }

    renderTeamStatement() {
        return (
            <strong><h4>How does team 10 count to their team's number? With Two Hands Up!! </h4></strong>
        )
    }
}
