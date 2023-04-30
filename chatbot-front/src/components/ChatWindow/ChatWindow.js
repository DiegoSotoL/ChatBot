import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { Global, css } from '@emotion/react';

import Header from '../Header/Header';
import MessageList from '../MessageList/MessageList';
import InputForm from '../InputForm/InputForm';

import { useChatWindowLogic } from './ChatWindowsLogic';

import styles from './ChatWindowStyle'

const ChatWindow = () => {
  const {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    inputValue,
    setInputValue,
    messagesEndRef,
    scrollToBottom,
    handleBotResponse,
    handleSubmit,
  } = useChatWindowLogic();


 

  return (
    <>
      <Global styles={styles.globalStyles} />
      <styles.CustomContainer maxWidth="sm">
        <styles.CenterBox>
          <Box my={4}>
            <Header />
            <styles.CustomPaper elevation={3}>
              <MessageList
                messages={messages}
                isLoading={isLoading}
                messagesEndRef={messagesEndRef}
              />
              <InputForm
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSubmit={handleSubmit}
              />
            </styles.CustomPaper>
          </Box>
        </styles.CenterBox>
      </styles.CustomContainer>
    </>
  );
};

export default ChatWindow;