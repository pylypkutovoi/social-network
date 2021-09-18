import { Dispatch } from 'redux';
import { chatAPI, ChatMessageType, StatusType } from './../services/chat-api';
import { InferActionsType, BaseThunkType } from './redux-store';
import {v1} from 'uuid';

type TChatMessage = ChatMessageType & {id: string};

const initialState = {
  messages: [] as TChatMessage[],
  status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch(action.type) {
    case 'CHAT/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))].filter((m, idx, arr) => idx >= arr.length - 50)
      }
    case 'CHAT/STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state;
  }
}

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) => ({
    type: 'CHAT/MESSAGES_RECEIVED',
    payload: { messages }
  } as const),
  statusChanged: (status: StatusType) => ({
    type: 'CHAT/STATUS_CHANGED',
    payload: {status}
  } as const)
};

let _handleNewMessages: ((messages: ChatMessageType[]) => void) | null = null;

const handleNewMessages = (dispatch: Dispatch) => {
  if(_handleNewMessages === null) {
    _handleNewMessages = (messages: ChatMessageType[]) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _handleNewMessages;
}

let _handleStatusChange: ((status: StatusType) => void) | null = null;

const handleStatusChange = (dispatch: Dispatch) => {
  if(_handleStatusChange === null) {
    _handleStatusChange = (status: StatusType) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _handleStatusChange;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('messages-received', handleNewMessages(dispatch));
  chatAPI.subscribe('status-changed', handleStatusChange(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', handleNewMessages(dispatch));
  chatAPI.unsubscribe('status-changed', handleStatusChange(dispatch))
  chatAPI.stop();
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message);
}

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;