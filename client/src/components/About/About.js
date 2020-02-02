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

export default class About extends Component {

  render() {
    return (<Container id="about">
      <Row>
        <Col>
          <h2 className="font-weight-bold">
            {CLIENT_TEAM_NAME}
          </h2>
        </Col>
        <Col id="closeAbout" xs='auto'>
          <Button className='btn-csu w-100' onClick={this.props.closePage} xs={1}>
            Close
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card style={{
              width: '15rem'
            }}>
            <CardImg top width="100%" src="src/components/About/teamImages/AustinSorianoImg.jpg" alt="blank" />
            <CardBody>
              <CardTitle><strong>Austin Soriano</strong></CardTitle>
              <CardText>
                Hello my name is Austin. I am currently a Junior at Colorado
                State University and Majoring in Computer Science. In my free
                time I enjoy Snowboarding and Mountain Biking.
              </CardText>
            </CardBody>
          </Card>
        </Col>

          <Col>
              <Card style={{
                  width: '15rem'
              }}>
                  <CardImg top width="100%" src="src/components/About/teamImages/StevenLampImg.jpg" alt="blank" />
                  <CardBody>
                      <CardTitle><strong>Steven Lamp</strong></CardTitle>
                      <CardText>
                          Hello, my name is Steven! I am a Junior CS student at CSU. I
                          avidly pursue topics in CyberSecurity. I am also a drummer for local bands
                          and enjoy any and all nerdy things! If you see me out and about, give me a shout!
                      </CardText>
                  </CardBody>
              </Card>
          </Col>

          <Col>
              <Card style={{
                  width: '15rem'
              }}>
                  <CardImg top width="100%" src="src/components/About/teamImages/cade_image.jpg" alt="blank" />
                  <CardBody>
                      <CardTitle><strong>Cade McCumber</strong></CardTitle>
                      <CardText>
                          My name is Cade, currently a Junior undergrad at CSU pursuing Computer Science.
                          I occasionally enjoy exercise, cooking and arguing about art and music with everyone
                          around me.
                      </CardText>
                  </CardBody>
              </Card>
          </Col>
      </Row>
    </Container>)
  }
}
