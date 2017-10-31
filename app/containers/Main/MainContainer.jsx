import React from 'react';
import PropTypes from 'prop-types';
import { container, innerContainer } from './styles.css';
import { Navigation } from '../../components';

const MainContainer = props => (
  <div className={container}>
    <Navigation isAuthed />
    <div className={innerContainer}>
      {props.children}
    </div>
  </div>
);

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContainer;
