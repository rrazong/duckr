import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from '../../components';
import * as modalActionCreators from '../../redux/modules/modal';

const mapStateToProps = ({ modal, users }) => {
  const duckTextLength = modal.duckText.length;

  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    isOpen: modal.isOpen,
    duckText: modal.duckText,
    isSubmitDisabled: duckTextLength === 0 || duckTextLength > 140,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(modalActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
