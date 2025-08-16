// src/components/Message.jsx

import React from "react";

const Message = ({ message, currentUserId }) => {
  const isOwnMessage = message.sender._id === currentUserId;

  return (
    <div
      className={`mb-2 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md break-words ${
          isOwnMessage
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="block text-xs mt-1 opacity-70">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default Message;

