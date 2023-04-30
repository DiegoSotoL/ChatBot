import React from 'react';

import styles from './MessageStyle'
const Message = ({ message, isBot }) => {
  return (
    <styles.CustomMessageContainer isBot={isBot}>
      <styles.CustomMessageBox isBot={isBot}>{message}</styles.CustomMessageBox>
    </styles.CustomMessageContainer>
  );
};

export default Message;
