import styled from 'styled-components';
import { IPropsUI } from './IUIInterfaces';

export const ContainerForms = styled.div`
display: inline-block;
background-color: #17212b;
width: 50%;
height: 877px;
background-color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#17212b' : '#4082bc')};
`;

export const CustomForm = styled.form`
  width: 75%;
  height: 46%;
  background-color: #4082bc;
  margin: 0 auto;
  font-size: 25px;
  text-align: center;
  background-color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#234a6d' : '#abf')};

  p:nth-child(1) {
    color: ${(props: IPropsUI) => (props.theme.thema === 'dark' ? '#fff' : 'black')};
  }

input, textarea {
  width: 90%;
  height: 13%;
  margin: 10px 0 0 30px;
}

textarea {
  height: 25%;
  resize: none;
}

span {
  display: block;
  color: red;
  font-size: 20px;
}

button {
  display: block;
  margin: 7px auto;
  width: 30%;
  height: 14%;
  border-radius: 25px;
}
`;
