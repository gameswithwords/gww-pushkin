// react imports
import React from 'react';

// styling
import { Row, Col } from 'react-bootstrap';

function ProjectsPage() {
  return (
    <div className="white">
      <Row className="display">
        <Col xs={12}>
          <div className="blurb">
            <p className="blurb">
              Want to participate in science not just as a subject but as
              a researcher? Professional researchers are increasingly{' '}
              <a href="http://en.wikipedia.org/wiki/Citizen_science">
                turning to amateurs
              </a>{' '}
              to solve critical scientific problems. Help out with one of
              our projects below.
            </p>
            <hr />
            <p className="blurb" style={{ marginLeft: '20px', marginRight: '20px' }}>
              <a
                className="title"
                href="http://archive.gameswithwords.org/VerbCorner"
                target="_blank"
                rel="noopener noreferrer"
              >
                VerbCorner
              </a>
              <br />
              Help us crowdsource the structure of language, meaning, and thought.
            </p>
            <hr />
            <p className="blurb" style={{ marginTop: '20px' }}>
              More projects coming soon! Check back later.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectsPage;
