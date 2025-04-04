import React, { useEffect } from 'react'
import { useStore } from '../Store/UseChatStore(zustand)'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageSkeleton from './Skeleton/MessageSkeleton'
import { UseAuthStore } from '../Store/UseAuthStore(zustand)'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
  const { getUser, message, isMesssageloading, getMessages, UserSelected } = useStore()
  const { authUser } = UseAuthStore()

  useEffect(() => {
    getMessages(UserSelected._id)
  }, [getMessages, UserSelected._id])

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

      <div className="flex-1 flex p-4 overflow-y-auto flex-col space-y-4">
        {message.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={msg.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : msg.sender.profilePic} />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(msg.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex-col">
              {msg.image && (
              <img 
              src ={msg.image}
              alt="message"
              className="w-10 h-10 rounded-md object-cover"
              />)}
              {msg.text && <p>{msg.text}</p>} 

            </div>
          </div>
        ))}
      </div>

      <ChatInput />
    </div>
  )
}

export default ChatContainer