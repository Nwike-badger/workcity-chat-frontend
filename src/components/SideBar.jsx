// src/components/Sidebar.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api";
import UserListModal from "./UserListModal"; 

const Sidebar = ({
  currentUserId,
  onSelectConversation,
  conversations,
  setConversations,
  activeConversationId,
  onDeleteConversation,
}) => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await api.get("/conversations");
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [currentUserId, setConversations]);

  
  const handleStartConversation = async (user) => {
    try {
      
      const { data: newOrExistingConversation } = await api.post("/conversations/create", {
        recipientId: user._id,
      });

      
      if (!conversations.some(conv => conv._id === newOrExistingConversation._id)) {
        
        setConversations(prev => [newOrExistingConversation, ...prev]);
      }

    
      onSelectConversation(newOrExistingConversation);
      
      
      setIsModalOpen(false);

    } catch (error) {
      console.error("Failed to start conversation", error);
    }
  };

  return (
    <>
      <div className="w-full md:w-1/4 bg-white border-r border-gray-200 p-4 shadow-md rounded-lg md:rounded-r-none h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Conversations
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-sm"
            title="Start New Chat"
          >
            + New
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading conversations...</p>
        ) : conversations.length === 0 ? (
          <div className="text-center text-gray-500 p-4">
            <p>No conversations yet.</p>
            <p className="mt-2 text-sm">Click "+ New" to start a chat!</p>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto space-y-2">
          {conversations.map((conv) => {
            const otherUsers = conv.participants.filter(
              (p) => p._id !== currentUserId
            );
            const title =
              otherUsers.map((p) => p.email).join(", ") || "Conversation";
            
            const isActive = conv._id === activeConversationId;

            return (
              <li
                key={conv._id}
                className={`p-3 border rounded-lg transition group flex justify-between items-center ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <div onClick={() => onSelectConversation(conv)} className="flex-1 cursor-pointer">
                  <p className={`font-medium ${isActive ? 'text-white' : 'text-gray-800'}`}>{title}</p>
                  {conv.lastMessage && (
                    <p className={`text-sm truncate ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                      {conv.lastMessage.text}
                    </p>
                  )}
                </div>
                {/* NEW: Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent conversation from being selected
                    if (window.confirm('Are you sure you want to delete this conversation?')) {
                      onDeleteConversation(conv._id);
                    }
                  }}
                  className={`ml-2 p-1 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-white hover:bg-red-400' : ''}`}
                  title="Delete Conversation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
        )}
      </div>

    
      <UserListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectUser={handleStartConversation}
      />
    </>
  );
};

export default Sidebar;


