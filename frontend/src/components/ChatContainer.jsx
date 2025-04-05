import React, { useEffect, useRef } from 'react'
import { useStore,  } from '../Store/UseChatStore(zustand)'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageSkeleton from './Skeleton/MessageSkeleton'
import { UseAuthStore } from '../Store/UseAuthStore(zustand)'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
  const {  message, isMesssageloading, getMessages, UserSelected ,Subscibetomessage,unsubscribeFromMessages} = useStore()
  const { authUser } = UseAuthStore()
  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(UserSelected._id)
    Subscibetomessage()

    return () => {
      unsubscribeFromMessages
    }
  }, [getMessages, UserSelected._id,unsubscribeFromMessages,Subscibetomessage])

  useEffect(() => {
    if (messageEndRef.current && message) {
      const isAtBottom = messageEndRef.current.offsetTop + messageEndRef.current.offsetHeight >= messageEndRef.current.parentNode.scrollTop + messageEndRef.current.parentNode.offsetHeight;
      if (message[message.length - 1].senderId !== authUser._id || isAtBottom) {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [message, authUser._id]);
  
  if (isMesssageloading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    )
  }


  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((message,index) => (
          <div
            key={index}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : UserSelected.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <ChatInput />
    </div>
  );
};
export default ChatContainer;