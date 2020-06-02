import styled from 'styled-components';
import { IPropsUI } from './IUIInterfaces';

export const CommentPost = styled.div<IPropsUI>`
display: flex;
flex-direction: column;
padding: 10px 0px 17px 15px;
margin-bottom: 5px;
position: relative;
border: 6px solid ${(props) => (props.theme.thema === 'dark' ? 'black' : '#b3a1a1')};

&:hover {
  background-color: ${(props) => (props.theme.thema === 'dark' ? '#234A6D' : '#abf')};
}
`;

export const CommentButton = styled.button<IPropsUI>`
background-color: inherit;
border: none;
font-size: 18px;
cursor: pointer;
color: ${(props) => (props.theme.thema === 'dark' ? '#fff' : 'black')};
`;
