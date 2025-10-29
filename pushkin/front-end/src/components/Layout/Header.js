// ./src/components/Layout/Navigation.js

import React, { Fragment, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

//redux
import { connect } from 'react-redux';
import { getUser, setUserID } from '../../actions/userInfo';

//styling
import { Nav, Navbar, Button, Image } from 'react-bootstrap';

//other
import { CONFIG } from '../../config';

const mapStateToProps = (state) => {
  return {
    userID: state.userInfo.userID,
  };
};

const Header = (props) => {
  const isAuthenticated = false;
  const user = null;

  useEffect(() => {
    props.dispatch(getUser(isAuthenticated, user));
  }, [isAuthenticated]);

  return (
    <Navbar
      expand="lg"
      style={{
        fontSize: '20px',
        fontFamily: "'Ribeye Marrow', cursive",
        backgroundColor: '#a9a9a9',
        margin: 0,
        padding: 0
      }}
    >
      <LinkContainer to="/">
        <Navbar.Brand style={{ padding: '10px' }}>
          <Image
            src={require('../../assets/images/logo/gww_logo.png')}
            height="80"
            alt="Games With Words"
          />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto" style={{ width: '100%' }}>
          <LinkContainer to="/paths">
            <Nav.Link>Paths</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/projects">
            <Nav.Link>Projects</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/quizzes">
            <Nav.Link>Quizzes</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/findings">
            <Nav.Link>Findings</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
          <Nav.Link href="https://blog.gameswithwords.org/" target="_blank">Blog</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(mapStateToProps)(Header);
