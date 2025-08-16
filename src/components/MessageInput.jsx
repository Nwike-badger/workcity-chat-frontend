// src/components/MessageInput.jsx

import React, { useState, useEffect, useRef } from 'react';

const MessageInput = ({ onSendMessage, onTypingStart, onTypingStop }) => {
    const [content, setContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    const handleInputChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);

        if (newContent.length > 0 && !isTyping) {
            setIsTyping(true);
            onTypingStart(); 
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            onTypingStop(); 
        }, 1500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onSendMessage(content.trim());
            setContent('');

            if (isTyping) {
                setIsTyping(false);
                onTypingStop();
                if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <textarea
                value={content}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={1}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition disabled:opacity-50"
                disabled={!content.trim()}
            >
                Send
            </button>
        </form>
    );
};

export default MessageInput;