import React from 'react';
import PropTypes from 'prop-types';
import { default as ReactModal } from 'react-modal';
import {
  newDuckInputContainer,
  darkBtn,
  newDuckTop,
  newDuckInput,
  pointer,
  submitDuckBtn,
} from './styles.css';

const modalStyles = {
  content: {
    width: 350,
    margin: '0 auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
};

function Modal(props) {
  function submitDuck() {
    const { user, duckText } = props;

    console.log(user, duckText);
  }

  const {
    closeModal,
    duckText,
    isOpen,
    isSubmitDisabled,
    openModal,
    updateDuckText,
  } = props;

  return (
    <span
      className={darkBtn}
      onClick={isOpen ? undefined : openModal}
      onKeyUp={openModal}
      role="button"
      tabIndex={0}
    >
      {'New Duck'}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className={newDuckTop}>
          <span>Compose new Duck</span>
          <span
            className={pointer}
            onClick={closeModal}
            onKeyUp={closeModal}
            role="button"
            tabIndex={0}
          >
            x
          </span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            className={newDuckInput}
            onChange={e => updateDuckText(e.target.value)}
            maxLength="140"
            placeholder="Enter new duck here."
            type="text"
            value={duckText}
          />
        </div>
        <button
          className={submitDuckBtn}
          onClick={submitDuck}
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </ReactModal>
    </span>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  duckText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  updateDuckText: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default Modal;
