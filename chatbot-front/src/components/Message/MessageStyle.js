import styled from '@emotion/styled';

const CustomMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isBot }) => (isBot ? 'flex-start' : 'flex-end')};
  margin: 10px;
`;

const CustomMessageBox = styled.div`
  background-color: ${({ isBot }) => (isBot ? '#f0f0f0' : '#0084ff')};
  color: ${({ isBot }) => (isBot ? 'black' : 'white')};
  padding: 10px 20px;
  border-radius: 20px;
  max-width: 70%;
  margin-bottom: 5px;
`;

const styles = {
    CustomMessageContainer,
    CustomMessageBox
  };
  
  export default styles;