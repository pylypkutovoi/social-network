import {
  addNewMessageCreator
} from '../../redux/dialogs-reducer';
import Dialogs from './dialogs';

import {connect} from 'react-redux';
import {withAuthRedirect} from '../hoc/with-auth-redirect';
import {compose} from 'redux';


const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => dispatch(addNewMessageCreator(newMessageBody)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
