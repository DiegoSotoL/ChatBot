import React from 'react';
import { Box } from '@mui/material';
import { Global } from '@emotion/react';

import Header from '../Header/Header';
import MessageList from '../MessageList/MessageList';
import InputForm from '../InputForm/InputForm';

import { useChatWindowLogic } from './ChatWindowsLogic';

import styles from './ChatWindowStyle'

const ChatWindow = () => {
  const {
    messages,
    isLoading,
    inputValue,
    setInputValue,
    handleSubmit,
    addMenuButtons,
    callApi,
  } = useChatWindowLogic();



  const handleApiCall = async () => {
    await callApi(inputValue);
  };

  return (
    <>
      <Global styles={styles.globalStyles} />
      <styles.CustomContainer maxWidth="sm">
        <styles.CenterBox>
          <Box my={4}>
            <Header onMenuButtonClick={() => addMenuButtons('mainMenu')} />
            <styles.CustomPaper elevation={3}>
              <MessageList messages={messages} isLoading={isLoading} onButtonClick={handleSubmit} />
              <InputForm
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSubmit={() => {
                  if (inputValue.trim()) {
                    handleSubmit(inputValue);
                  }
                }}
              />
            </styles.CustomPaper>
          </Box>
        </styles.CenterBox>
      </styles.CustomContainer>
    </>
  );
};

export default ChatWindow;
