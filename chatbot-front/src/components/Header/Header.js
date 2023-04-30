import React from 'react';
import styles from './HeaderStyle'


const Header = () => {
  return (
    <styles.CustomTypographyTitle variant="h4" component="h1" align="center" gutterBottom>
      Chatbot
    </styles.CustomTypographyTitle>
  );
};

export default Header;
