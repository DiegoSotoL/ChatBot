import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export const useChatWindowLogic = () => {
  const [messages, setMessages] = useState([
    { isBot: true, text: 'Hola, soy tu chatbot guiado. ¿En qué puedo ayudarte hoy?' },
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

  const handleBotResponse = (response, predict = '', accuracy = '') => {
    setMessages((prevMessages) => [...prevMessages, { isBot: true, text: response }]);
    if (predict) {
      setMessages((prevMessages) => [...prevMessages, { isBot: true, text: 'Intent: ' + predict }]);
    }
    if (accuracy) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { isBot: true, text: 'Accuracy: ' + accuracy },
      ]);
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, { isBot: false, text: inputValue }]);
      setInputValue('');

      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:3001/respuesta', {
          message: inputValue,
        });

        const botResponse = response.data.message;
        const botPredict = response.data.predict;
        const botAccuracy = response.data.accuracy;
        handleBotResponse(botResponse, botPredict, botAccuracy);
      } catch (error) {
        console.error('Error al obtener respuesta del chatbot:', error);
        handleBotResponse(
          'Lo siento, ocurrió un error al procesar tu respuesta. Por favor, inténtalo de nuevo.',
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
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
  };
};
