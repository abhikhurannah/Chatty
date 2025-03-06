"use client"

import { useEffect, useRef } from "react"
import { useAuthstore } from "../store/useAuthstore"
import { useChatStore } from "../store/useChatStore"
import MessageInput from "./MessageInput"
import MessageSkeleton from "./skeleton/MessageSkeleton"
import ChatHeader from "./ChatHeader"
import { formatMessageTime } from "../lib/utils"

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeFromMessages } = useChatStore()

  const { authUser } = useAuthstore()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()
    return () => {
      unsubscribeFromMessages()
    }
    
  }, [selectedUser._id, getMessages,subscribeToMessages,unsubscribeFromMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (isMessagesLoading)
    return (
      <div className="dark:bg-[#171a3bfa] h-screen w-screen">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )

  return (
    <div className="flex flex-col h-[91.35vh] w-[75vw] dark:bg-[#0d0e1d]">
      {/* Chat Header */}
      <ChatHeader />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 p-4 dark:bg-[#0c0c1e] space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === authUser._id

          return (
            <div
              key={message._id}
              className={`flex items-start gap-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full border overflow-hidden">
                  <img
                    src={
                      isCurrentUser ? authUser.profilePic || "/contact.png" : selectedUser.profilePic || "/contact.png"
                    }
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Message content */}
              <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? "items-end" : "items-start"}`}>
                {/* Timestamp */}
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {formatMessageTime(message.createdAt)}
                </div>

                {/* Message bubble */}
                <div
                  className={`rounded-lg px-4 py-2 shadow-md ${
                    isCurrentUser
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image || "/placeholder.svg"}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p className="text-sm leading-relaxed">{message.text}</p>}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="dark:bg-[#1a1e44fa] p-3 border-t border-gray-700">
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatContainer
