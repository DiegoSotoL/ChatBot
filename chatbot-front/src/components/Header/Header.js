import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onMenuButtonClick }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ChatBot
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={onMenuButtonClick}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
