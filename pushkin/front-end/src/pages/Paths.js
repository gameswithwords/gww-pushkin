// react imports
import React from 'react';
import { Link } from 'react-router-dom';

// styling
import { Row, Col, Image } from 'react-bootstrap';

function PathsPage() {
  return (
    <div className="white">
      <Row className="display">
        <Col sm={12} lg={12} className="textCenter">
          <p className="title" style={{ fontSize: '28px' }}>
            CHOOSE YOUR PATH.
          </p>
          <p className="blurb" style={{ fontSize: '18px' }}>
            <b>I want to be a...</b>
          </p>
        </Col>
      </Row>
      <Row className="display">
        <Col sm={12} lg={6} className="textCenter">
          <Link to="/projects">
            <Image
              src={require('../assets/images/gif/res.gif')}
              style={{ marginTop: '25px' }}
              fluid
              className="gif"
            />
          </Link>
          <p className="blurb" style={{ fontSize: '18px' }}>
            <b>Researcher</b>
          </p>
          <p className="blurb" style={{ marginBottom: '50px' }}>
            Take control and help unlock the mysteries of language.
          </p>
        </Col>
        <Col sm={12} lg={6} className="textCenter">
          <Link to="/quizzes">
            <Image
              src={require('../assets/images/gif/par.gif')}
              style={{ marginTop: '25px' }}
              fluid
              className="gif"
            />
          </Link>
          <p className="blurb" style={{ fontSize: '18px' }}>
            <b>Participant</b>
          </p>
          <p className="blurb" style={{ marginBottom: '50px' }}>
            Be a part of linguistics research and support our scientists.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default PathsPage;
