// src/components/ChatWindow.jsx

import React, { useEffect, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput"; 
import { getSocket } from "../services/socket"; 

const ChatWindow = ({
  messages,
  currentUserId,
  typingUsers,
  participants,
  onSendMessage,
  isLoading,
}) => {
  const messagesEndRef = useRef(null);

  
  const conversationId = participants.length > 0 ? messages[0]?.conversation : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const conversationTitle =
    participants
      .filter((p) => p._id !== currentUserId)
      .map((p) => p.email)
      .join(", ") || "Chat";

  // Typing indicator handlers
  const handleTypingStart = () => {
    getSocket()?.emit("typing", { conversationId });
  };

  const handleTypingStop = () => {
    getSocket()?.emit("stopTyping", { conversationId });
  };
  
  return (
    <div className="flex-1 bg-white p-4 rounded-lg md:rounded-l-none h-full flex flex-col shadow-md">
      {/* Header */}
      <div className="border-b border-gray-200 pb-3 mb-3">
        <h3 className="text-xl font-semibold text-gray-800">
          {conversationTitle}
        </h3>
        {typingUsers.length > 0 && (
          <p className="text-blue-500 text-sm animate-pulse h-5">
            {typingUsers.map((user) => user.email).join(", ")} is typing...
          </p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto border border-gray-200 p-3 rounded-md bg-gray-50 flex flex-col">
        {isLoading ? (
            <p className="text-center text-gray-500 m-auto">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500 m-auto">
            No messages yet. Start the conversation! 🎉
          </p>
        ) : (
          messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              currentUserId={currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box - REFACTORED to use MessageInput component */}
      <div className="mt-3 border-t pt-3">
        <MessageInput
            onSendMessage={onSendMessage}
            onTypingStart={handleTypingStart}
            onTypingStop={handleTypingStop}
        />
      </div>
    </div>
  );
};

export default ChatWindow;