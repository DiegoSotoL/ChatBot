import React, { useEffect, useRef,useState } from 'react';
import { Box, CircularProgress, Button } from '@mui/material';
import Message from '../Message/Message';
import MenuButtons from '../MenuButtons/MenuButtons';
import { menus } from '../MenuButtons/MenuButtonsLogic';
const MessageList = ({ messages, isLoading, onButtonClick, showMenuButtons }) => {
  const messagesEndRef = useRef(null);
  const [currentMenu, setCurrentMenu] = useState('mainMenu');

  

  const renderMessageOrButton = (message, index) => {
    if (message.isButton) {
      return (
        <Box key={index} display="flex" flexDirection="column">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onButtonClick(message.text)}
            style={{ marginTop: 10 }}
          >
            {message.text}
          </Button>
        </Box>
      );
    } else {
      return <Message key={index} message={message.text} isBot={message.isBot} />;
    }
  };
  const handleButtonClick = (buttonText) => {
    const foundMenu = Object.entries(menus).find(([key, value]) => value.includes(buttonText));
  
    if (foundMenu) {
      setCurrentMenu(foundMenu[0]);
    } else {
      onButtonClick(buttonText);
    }
  };
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      {showMenuButtons && (
        <Box width="100%">
        <MenuButtons menu={currentMenu} onButtonClick={handleButtonClick} />
      </Box>
      )}
      <Box p={2} minHeight="60vh" maxHeight="60vh" overflow="auto">
        {messages.map(renderMessageOrButton)}
        {isLoading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
        <span ref={messagesEndRef}></span>
      </Box>
    </>
  );
};

export default MessageList;
