import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatForm from './chat-form';
import ChatMessages from './chat-messages';
import { startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import { AppState } from '../../redux/redux-store';

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const chatStatus = useSelector((state: AppState) => state.chat.status);
  
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    }
  }, [])

  return (
    <div>
      {chatStatus === 'error' && <div>SOME ERROR OCCURED</div>}
      <ChatMessages />
      <ChatForm />
    </div>
  )
}

export default Chat;
