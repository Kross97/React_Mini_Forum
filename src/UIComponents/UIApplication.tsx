import styled, { createGlobalStyle } from 'styled-components';
import { IPropsUI } from './IUIInterfaces';

export const Navigation = styled.nav<IPropsUI>`
  width: 100%;
  height: 60px;
  background-color: ${(props) => (props.theme.thema === 'dark' ? '#17212B' : '#4082bc')} ;
`;

export const ButtonAdd = styled.button<IPropsUI>`
  width: 15%;
  height: 100%;
  font-size: 21px;
  color: ${(props) => (props.theme.thema === 'dark' ? '#fff' : 'black')};
  background-color: ${(props) => (props.theme.thema === 'dark' ? '#4082BC' : '#75baff')};
  border: none;

  &:hover {
   background-color: ${(props) => (props.theme.thema === 'dark' ? '#306a9d' : '#66a4e1')};
  }
`;

export const ColorStyle = createGlobalStyle<IPropsUI>`
body {
  color: ${(props) => (props.theme.thema === 'dark' ? '#fff' : 'black')};
}
`;
