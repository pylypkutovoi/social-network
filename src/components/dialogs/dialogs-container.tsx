import {
  actions
} from '../../redux/dialogs-reducer';
import Dialogs from './dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../hoc/with-auth-redirect';
import {compose} from 'redux';
import { AppState } from '../../redux/redux-store';
import React from 'react';


const mapStateToProps = (state: AppState) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

const mapDispatchToProps = {
  sendMessage: actions.addNewMessageCreator
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
