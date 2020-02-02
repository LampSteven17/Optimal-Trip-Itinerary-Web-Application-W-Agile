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
      </Row>
    </Container>)
  }
}
