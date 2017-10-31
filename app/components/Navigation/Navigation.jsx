import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { nav, action } from './styles.css';

const Navigation = ({ isAuthed }) => (
  <div>
    <nav>
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
      <ul className={nav}>
        <li><Link to="/">Home</Link></li>
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
      <ul className={action}>
        <li>New Duck</li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    )
    : (
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/auth">Authenticate</Link></li>
      </ul>
    )
);

ActionLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

export default Navigation;
