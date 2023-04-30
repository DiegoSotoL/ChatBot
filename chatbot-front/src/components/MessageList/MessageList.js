import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Message from '../Message/Message';

const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box p={2} minHeight="60vh" maxHeight="60vh" overflow="auto">
      {messages.map((message, index) => (
        <Message key={index} message={message.text} isBot={message.isBot} />
      ))}
      {isLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      <span ref={messagesEndRef}></span>
    </Box>
  );
};

export default MessageList;
