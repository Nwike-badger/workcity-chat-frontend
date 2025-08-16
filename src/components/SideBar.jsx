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
                  onClick={() => onSelectConversation(conv)}
                  className={`p-3 border rounded-lg cursor-pointer transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <p className={`font-medium ${isActive ? 'text-white' : 'text-gray-800'}`}>{title}</p>
                  {conv.lastMessage && (
                    <p className={`text-sm truncate ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                      {conv.lastMessage.text}
                    </p>
                  )}
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


