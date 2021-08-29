import { InferActionsType } from "./redux-store";

type MessageType = {
  id: number;
  messageText: string
}
type DialogsType = {
  id: number;
  name: string;
}

const initialState = {
  messagesData: [
    {id: 1, messageText: 'some text 1'},
    {id: 2, messageText: 'some text 2'},
    {id: 3, messageText: 'some text 3'}
  ] as Array<MessageType>,
  dialogsData: [
    {id: 1, name: 'Name 1'},
    {id: 2, name: 'Name 2'},
    {id: 3, name: 'Name 3'},
    {id: 4, name: 'Name 4'},
    {id: 5, name: 'Name 5'},
  ] as Array<DialogsType>
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch(action.type) {
    case 'DIALOGS/SEND_MESSAGE':
      const newMessage = {
        id: 6,
        messageText: action.newMessageBody
      };
      return {
        ...state,
        messagesData: [...state.messagesData, newMessage]
      }
    default:
      return state;
  }
}

export const actions = {
  addNewMessageCreator: (newMessageBody: string) => ({
    type: 'DIALOGS/SEND_MESSAGE', newMessageBody
  } as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;