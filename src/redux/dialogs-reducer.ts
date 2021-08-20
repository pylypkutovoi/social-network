const SEND_MESSAGE = 'SEND-MESSAGE';

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

export type InitialStateType = typeof initialState;
const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch(action.type) {
    case SEND_MESSAGE:
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

type AddNewMessage = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string
}

export const addNewMessageCreator = (newMessageBody: string): AddNewMessage => ({
  type: SEND_MESSAGE, newMessageBody
})
export default dialogsReducer;