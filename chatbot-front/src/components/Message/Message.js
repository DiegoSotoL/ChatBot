import React from 'react';

import styles from './MessageStyle'
const Message = React.memo(({ message, isBot }) => {  return (
    <styles.CustomMessageContainer isBot={isBot}>
      <styles.CustomMessageBox isBot={isBot}>{message}</styles.CustomMessageBox>
    </styles.CustomMessageContainer>
  );
});

export default Message;
