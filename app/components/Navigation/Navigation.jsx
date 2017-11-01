import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { container, navContainer, link } from './styles.css';

const Navigation = ({ isAuthed }) => (
  <div className={container} >
    <nav className={navContainer} >
      <NavLinks isAuthed={isAuthed} />
      <ActionLinks isAuthed={isAuthed} />
    </nav>
  </div>
);

Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

const NavLinks = ({ isAuthed }) => (
  isAuthed
    ? (
      <ul>
        <li><Link className={link} to="/">Home</Link></li>
      </ul>
    )
    : null
);

NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

const ActionLinks = ({ isAuthed }) => (
  isAuthed
    ? (
      <ul>
        <li>New Duck</li>
        <li><Link className={link} to="/logout">Logout</Link></li>
      </ul>
    )
    : (
      <ul>
        <li><Link className={link} to="/">Home</Link></li>
        <li><Link className={link} to="/auth">Authenticate</Link></li>
      </ul>
    )
);

ActionLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

export default Navigation;
