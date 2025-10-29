// react imports
import React from 'react';
import { Link } from 'react-router-dom';

// styling
import { Row, Col, Image } from 'react-bootstrap';

function HomePage() {
  return (
    <div>
      {/* Hero landing section with start button */}
      <Link to="/paths">
        <div
          style={{
            backgroundImage: `url(${require('../assets/images/logo/logo_button-min.png')})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '80vh',
            cursor: 'pointer'
          }}
        />
      </Link>

      <div className="white">
        <Row className="display">
          <Col sm={12} lg={6} className="textCenter">
            <Image
              src={require('../assets/images/gif/3.gif')}
              fluid
              className="gif"
            />
          </Col>
          <Col sm={12} lg={5} className="textCenter">
            <p className="title">
              <b>Contribute to linguistics research.</b>
            </p>
            <p className="blurb">
              With modern technology, it is the perfect time for professional
              and amateur scientists to collaborate. Together, we can explore
              the human mind by tackling the most pressing questions about our
              ability to acquire and learn language. What are you waiting for?
            </p>
          </Col>
        </Row>
      </div>
      <div className="tan">
        <Row className="display">
          <Col lg={1} />
          <Col lg={5} className="textCenter">
            <p className="title" style={{ marginTop: '90px' }}>
              <b>Collaborate with citizen scientists.</b>
            </p>
            <p className="blurb">
              It doesn't matter who you are. Join our interdisciplinary team
              of psychologists, computer scientists, and linguists today.
              Whether it's contributing to our blog or posting a question in
              the forum, you can advance science and mingle with people who
              are just as interested in research as you are.
            </p>
          </Col>
          <Col lg={6} className="textCenter">
            <Image
              style={{ marginTop: '90px' }}
              src={require('../assets/images/gif/2.gif')}
              fluid
              className="gif"
            />
          </Col>
        </Row>
      </div>
      <div className="white">
        <Row className="display">
          <Col sm={12} lg={6} className="textCenter">
            <Image
              src={require('../assets/images/gif/1.gif')}
              fluid
              className="gif"
            />
          </Col>
          <Col sm={12} lg={5} className="textCenter">
            <p className="title">
              <b>Discover new findings and learn.</b>
            </p>
            <p className="blurb">
              As volunteer scientists, you deserve to know the various
              exciting results produced from the lab. Head on over to the blog
              for articles, subscribe to our mailing list, and get ready to
              unlock the mysteries of human language.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
