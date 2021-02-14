import React from 'react';
import DialogItem from './dialog-item/dialog-item';
import MessageItem from './message-item/message-item';
import s from './dialogs.module.css';
import AddMessageForm from "./dialog-form/add-message-form";



const Dialogs = (props) => {
  const {dialogsData, messagesData} = props.dialogsPage;

  const dialogElements = dialogsData.map(dialog => (
    <DialogItem key={dialog.id} name={dialog.name}/>
  ));

  const messages = messagesData.map(message => (
    <MessageItem key={message.id}text={message.messageText}/>
  ))

  const addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  }
  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {dialogElements}
        </div>
        <div className={s.dialogsMessages}>
          {messages}
          <AddMessageForm onSubmit={addNewMessage}/>
        </div>

      </div>
    </div>

  )
}



export default Dialogs;