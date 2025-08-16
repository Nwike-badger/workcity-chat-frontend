// src/pages/ChatPage.jsx

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/SideBar";
import ChatWindow from "../components/ChatWindow";
import { getSocket, connectSocket, disconnectSocket } from "../services/socket"; 
import api from "../services/api"; 

const ChatPage = () => {
  const { user, token, logout } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  
  
  const activeConversationRef = useRef(null); 

  
  useEffect(() => {
    if (token) {
      const socket = connectSocket(token);

      socket.on("newMessage", (newMessage) => {
    
        if (newMessage.conversation === activeConversationRef.current?._id) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      socket.on("typing", ({ user, conversationId }) => {
        if (conversationId === activeConversationRef.current?._id) {
            setTypingUsers((prev) => [...prev, user]);
        }
      });

      socket.on("stopTyping", ({ user, conversationId }) => {
         if (conversationId === activeConversationRef.current?._id) {
            setTypingUsers((prev) => prev.filter((u) => u._id !== user._id));
        }
      });

      
      return () => {
        disconnectSocket();
      };
    }
  }, [token]);
  
  
  useEffect(() => {
    activeConversationRef.current = activeConversation;
  }, [activeConversation]);


  
  const handleSelectConversation = async (conversation) => {
    const socket = getSocket();
    if (!socket) return;


    if (activeConversation) {
        socket.emit("leaveConversation", activeConversation._id);
    }

    setTypingUsers([]); 
    setActiveConversation(conversation);
    
    
    socket.emit("joinConversation", conversation._id);

    
    setLoadingMessages(true);
    try {
      const { data } = await api.get(`/messages/${conversation._id}`);
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };


  const handleSendMessage = (text) => {
    const socket = getSocket();
    if (!socket || !activeConversation) return;

    const messageData = {
      conversationId: activeConversation._id,
      text,
    };
    
    
    socket.emit("sendMessage", messageData, (newMessage) => {
        
        setMessages((prev) => [...prev, newMessage]);
    });
  };

  if (!user) return <p className="p-4">Loading user...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Workcity Chat</h1>
        <div>
            <span className="text-gray-700 mr-4">Welcome, {user.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition"
            >
              Logout
            </button>
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col md:flex-row gap-4 max-w-7xl mx-auto w-full h-[calc(100vh-80px)]">
        <Sidebar
          currentUserId={user._id}
          conversations={conversations}
          setConversations={setConversations}
          onSelectConversation={handleSelectConversation}
          activeConversationId={activeConversation?._id}
        />

        {activeConversation ? (
          <ChatWindow
            currentUserId={user._id}
            messages={messages}
            typingUsers={typingUsers}
            participants={activeConversation.participants || []}
            onSendMessage={handleSendMessage} // Pass down the handler
            isLoading={loadingMessages}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">Select a conversation to start chatting 💬</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;