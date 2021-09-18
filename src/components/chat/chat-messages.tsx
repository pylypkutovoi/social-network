import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/redux-store";
import { ChatMessageType } from "../../services/chat-api";

const ChatMessages: React.FC = () => {
    const messagesRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const messages = useSelector((state: AppState) => state.chat.messages);
    const handleScroll = (e: React.UIEvent) => {
      const element = e.currentTarget;
      if (Math.abs(element.scrollHeight - element.scrollTop)  - element.clientHeight < 200) {
        setIsAutoScroll(true);
      } else {
        setIsAutoScroll(false);
      }
    }
    
    useEffect(() => {
      if (isAutoScroll) {
        messagesRef.current?.scrollIntoView({behavior: 'auto', block: 'end'})
      }
      
    }, [messages])

    return (
      <div style={{height: '400px', overflowY: 'auto'}} onScroll={handleScroll}>
        {messages.map((message) => <ChatMessage key={message.id} message={message}/>)}
        <div ref={messagesRef}></div>
      </div>
    )
  }
  
  const ChatMessage: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
    return (
      <div>
       <img width={50} src={message.photo} alt="" />
       <span>{message.userName}</span>
       <p>{message.message}</p>
      </div>
    )
  })

  export default ChatMessages;