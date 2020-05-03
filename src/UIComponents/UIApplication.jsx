import styled from 'styled-components';

export const Navigation = styled.nav`
  width: 100%;
  height: 60px;
  background-color: ${(props) => (props.thema === 'dark' ? '#17212B' : '#4082bc')} ;
`;

export const ButtonAdd = styled.button`
  width: 15%;
  height: 100%;
  font-size: 21px;
  color: ${(props) => (props.thema === 'dark' ? '#fff' : 'black')};
  background-color: ${(props) => (props.thema === 'dark' ? '#4082BC' : '#75baff')};
  border: none;

  &:hover {
   background-color: ${(props) => (props.thema === 'dark' ? '#306a9d' : '#66a4e1')};
  }
`;
