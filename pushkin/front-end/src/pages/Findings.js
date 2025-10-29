import React from 'react';
import FindingsData from '../components/Findings/FindingsData';
import { Container, Row, Col } from 'react-bootstrap';

const styles = {
  introText: {
    textAlign: 'left',
    marginBottom: '2rem',
    fontSize: '1rem'
  },
  findingsList: {
    textAlign: 'right',
    listStyle: 'none',
    padding: 0
  },
  findingLink: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    display: 'block',
    color: '#4A90E2',
    textDecoration: 'none'
  }
};

const FindingsPage = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <p style={styles.introText}>
            Read some of the previous research findings from GamesWithWords.org below. Results are also posted (more frequently) on the{' '}
            <a href="https://blog.gameswithwords.org/search/label/findings" target="_blank" rel="noopener noreferrer">
              blog under the tag "findings"
            </a>.
          </p>
        </Col>
        <Col md={6}>
          <ul style={styles.findingsList}>
            {FindingsData.map(f => (
              <li key={f.id}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" style={styles.findingLink}>
                  {f.title}
                </a>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default FindingsPage;
