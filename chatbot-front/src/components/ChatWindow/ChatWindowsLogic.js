import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { menus, getNextMenu } from '../MenuButtons/MenuButtonsLogic';
import { ACURRACYINTENT } from '../../constants/appConstants';

export const useChatWindowLogic = () => {
  const [messages, setMessages] = useState([
    { isBot: true, text: 'Wena choro. ¿En qué puedo ayudarte hoy?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentMenu, setCurrentMenu] = useState('mainMenu');
  const isMountedRef = useRef(false);

  const addMenuButtons = (menuName) => {
    let foundMenu;
    let nextMenuKey = null;

    // Buscar si menuName es una clave en el objeto 'menus'
    foundMenu = Object.entries(menus).find(([key, value]) => key.toLowerCase().trim() === menuName.toLowerCase().trim());

    // Si no se encuentra como clave, buscar si menuName es un valor en alguno de los menús
    if (!foundMenu) {
      const menuNameToFind = menuName.toLowerCase().trim();
      foundMenu = Object.entries(menus)
        .map(([key, value]) => [key, value.map(item => item.toLowerCase().trim())])
        .find(([key, value]) => value.includes(menuNameToFind));

      const [currentMenuKey] = foundMenu;
      nextMenuKey = getNextMenu(menuNameToFind, currentMenuKey);

        if (nextMenuKey) {// si aun nos e ha llegado alfinal del mapeo de un flujo
          foundMenu = Object.entries(menus).find(([key, value]) => key.toLowerCase().trim() === nextMenuKey.toLowerCase().trim());

        } else {
          setMessages((prevMessages) => [...prevMessages, { isBot: true, text: 'FINAAAAL: ' + menuNameToFind }]);
        }
    }

    // Si se encontró el menú
    if (foundMenu && (nextMenuKey || menuName === 'mainMenu')) {
      const [currentMenuKey, currentMenuValue] = foundMenu;

      setMessages((prevMessages) => [
        ...prevMessages,
        ...currentMenuValue.map((item) => ({ isBot: true, isButton: true, text: item })),
      ]);
    } else {
      // Manejar el caso en que no se encontró el menú
      console.error('No se encontró el menú con el nombre proporcionado.');
    }
  };
  const handleButtonClick = (buttonText) => {
    // Aquí puedes llamar a addMenuButtons o manejar el flujo del menú como prefieras
    addMenuButtons(buttonText);
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

  const handleBotResponse = (predict = '', accuracy = '') => {

    if (accuracy > ACURRACYINTENT) {
      addMenuButtons(predict)

    } else {
      if (predict) {
        setMessages((prevMessages) => [...prevMessages, { isBot: true, text: 'Intent: ' + predict }]);
      }
      if (accuracy) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { isBot: true, text: 'Accuracy: ' + accuracy },
        ]);
      }
    }

  };

  const handleSubmit = async (messageText) => {
    if (messageText.trim()) {
      const menuNameToFind = messageText.toLowerCase().trim();
      let foundMenu;
      foundMenu = Object.entries(menus)
        .map(([key, value]) => [key, value.map(item => item.toLowerCase().trim())])
        .find(([key, value]) => value.includes(menuNameToFind));

      if (foundMenu) {
        const [currentMenuKey] = foundMenu;
        const nextMenuKey = getNextMenu(messageText, currentMenuKey);

        if (nextMenuKey) {// si aun nos e ha llegado alfinal del mapeo de un flujo
          setCurrentMenu(nextMenuKey);
        } else {
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


        const botPredict = response.data.predict;
        const botAccuracy = response.data.acurracy;

        handleBotResponse(botPredict, botAccuracy);
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
    handleButtonClick 
  };
};
