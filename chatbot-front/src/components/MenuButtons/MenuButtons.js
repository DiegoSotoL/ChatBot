import React from 'react';
import { Button, Box } from '@mui/material';
import { menus } from '../../constantes';

const MenuButtons = ({ menu, onButtonClick }) => {
  
  const renderButtons = () => {
    return menus[menu].map((buttonName, index) => (
      <Button key={index} variant="contained" onClick={() => onButtonClick(buttonName)}>
        {buttonName}
      </Button>
    ));};

    return (
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        {renderButtons()}
      </Box>
    );
  
  };

export default MenuButtons;
