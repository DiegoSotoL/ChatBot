import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { menus, getNextMenu } from '../../constantes';

export const useChatWindowLogic = () => {
  const [messages, setMessages] = useState([
    { isBot: true, text: 'Wena choro. ¿En qué puedo ayudarte hoy?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentMenu, setCurrentMenu] = useState('mainMenu');
  const isMountedRef = useRef(false);

  const addMenuButtons = (menuName) => {
    const foundMenu = Object.entries(menus).find(([key, value]) => key.includes(menuName));
    const [currentMenuKey, currentMenuValue] = foundMenu;

    setMessages((prevMessages) => [
      ...prevMessages,
      ...currentMenuValue.map((item) => ({ isBot: true, isButton: true, text: item })),
    ]);
  };

  useEffect(() => {
    const runEffect = () => {
      if (isMountedRef.current) {
        addMenuButtons(currentMenu);
      } else {
        isMountedRef.current = true;
      }
    };

    runEffect();
  }, [currentMenu]);

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

  const handleSubmit = async (messageText) => {
    if (messageText.trim()) {
      const foundMenu = Object.entries(menus).find(([key, value]) => value.includes(messageText));

      if (foundMenu) {
        const [currentMenuKey, currentMenuValue] = foundMenu;
        const nextMenuKey = getNextMenu(messageText, currentMenuKey);

        if (nextMenuKey) {// si aun nos e ha llegado alfinal del mapeo de un flujo
          setCurrentMenu(nextMenuKey);
        }else{
          setMessages((prevMessages) => [...prevMessages, { isBot: true, text: 'FINAAAAL: ' + messageText }]);
        }
      }
    }

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
        const botAccuracy = response.data.acurracy;

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
    addMenuButtons,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    setInputValue,
    handleSubmit,
    inputValue,
  };
};
