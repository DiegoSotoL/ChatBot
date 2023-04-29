import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';

import axios from 'axios';
import styled from '@emotion/styled';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Global, css } from '@emotion/react';

const CustomTypographyTitle = styled(Typography)`
  color: #ffffff;
`;
const CenterBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`;



const globalStyles = css`
  body {
    background-color: #1a1a1a;
  }
`;

const CustomContainer = styled.div`
  max-width: 25%;
  margin: 0 auto;
`;

const CustomPaper = styled(Paper)`
  background-color: #000;
`;
const CustomTextField = styled(TextField)`
  label {
    color: #39ff14;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #39ff14;
    }
    &:hover fieldset {
      border-color: #39ff14;
    }
    &.Mui-focused fieldset {
      border-color: #39ff14;
    }
  }
  .MuiInputBase-input {
    color: #39ff14;
  }
`;

const CustomIconButton = styled(IconButton)`
  .MuiSvgIcon-root {
    color: #39ff14;
  }
  &:hover {
    background-color: rgba(57, 255, 20, 0.15);
  }
`;





const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { isBot: true, text: "Hola, soy tu chatbot guiado. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleBotResponse = (response, predict = '', acurracy = '') => {
    setMessages((prevMessages) => [...prevMessages, { isBot: true, text: response }]);
    if (predict) {
      setMessages((prevMessages) => [...prevMessages, { isBot: true, text: 'Intent: '+predict }]);
    }
    if (acurracy) {
      setMessages((prevMessages) => [...prevMessages, { isBot: true, text: 'Acurracy: '+acurracy }]);
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, { isBot: false, text: inputValue }]);
      setInputValue('');

      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:3001/respuesta", {
          message: inputValue,
        });

        const botResponse = response.data.message;
        const botPredict = response.data.predict;
        const botAcurracy = response.data.acurracy;
        handleBotResponse(botResponse, botPredict, botAcurracy);
      } catch (error) {
        console.error("Error al obtener respuesta del chatbot:", error);
        handleBotResponse(
          "Lo siento, ocurrió un error al procesar tu respuesta. Por favor, inténtalo de nuevo."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
    <Global styles={globalStyles} />
    <CustomContainer maxWidth="sm">
    <CenterBox>
      <Box my={4}>
      <CustomTypographyTitle variant="h4" component="h1" align="center" gutterBottom>
        Chatbot
      </CustomTypographyTitle>
        <CustomPaper  elevation={3}>
          <Box p={2} minHeight="60vh" maxHeight="60vh" overflow="auto" ref={messagesEndRef}>
            {messages.map((message, index) => (
              <Message key={index} message={message.text} isBot={message.isBot} />
            ))}
            {isLoading && (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            )}
          </Box>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <CustomTextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
              placeholder="Escribe un mensaje..."
              variant="outlined"
            />
            <CustomIconButton  type="submit" color="primary" disabled={!inputValue.trim()}>
              <SendIcon />
            </CustomIconButton >
          </Box>
        </CustomPaper >
      </Box>
      </CenterBox>
    </CustomContainer>
    </>
  );
};

export default ChatWindow;