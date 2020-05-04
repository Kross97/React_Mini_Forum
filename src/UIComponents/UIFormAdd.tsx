import styled from 'styled-components';
import { IPropsUI } from './IUIInterfaces';

export const Background = styled.div`
position: absolute;
width: 100%;
height: 910px;
opacity: 0.8;
z-index: 2;
top: 0;
  background-color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? 'black' : '#235705')};
`;

export const CustomForm = styled.form`
z-index: 3;
position: absolute;
width: 550px;
height: 350px;
top: 150px;
left: 550px;
text-align: center;
background-color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#17212B' : '#4082bc')};

input, textarea {
  font-size: 20px;
  width: 90%;
  height: 12%;
  margin-bottom: 8px;
  background-color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#152B42' : '#4082bc')};
  color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#fff' : 'black')};
  border: 2px solid ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#4082BC' : 'black')};
}

button {
  font-size: 20px;
  margin: 15px auto;
  width: 30%;
  height: 16%;
  margin-right: 25px;
  margin-left: 25px;
  background-color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#152B42' : '#4082bc')};
  color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#fff' : 'black')};
  border: 2px solid ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#4082BC' : 'black')};
  cursor: pointer;
}

button:hover {
 background-color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#316295' : '#30628f')};
}

textarea {
  resize: none;
  height: 25%;
}
`;
