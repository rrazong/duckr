import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { container, innerContainer } from './styles.css';
import { Navigation } from '../../components';

const MainContainer = (props) => {
  console.log(props);
  return (
    <div className={container}>
      <Navigation isAuthed={props.isAuthed} />
      <div className={innerContainer}>
        {props.children}
      </div>
    </div>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthed: PropTypes.bool.isRequired,
};

export default connect(state => ({
  isAuthed: state.isAuthed,
}))(MainContainer);
