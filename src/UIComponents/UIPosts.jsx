import styled from 'styled-components';

export const CurrentPost = styled.div`
width: 98.5%;
font-size: 25px;
word-wrap: break-word;
position: relative;
margin-bottom: 5px;
margin-top: 5px;
  border: 3px solid ${(props) => (props.thema === 'dark' ? '#3346ae' : '#75baff')};
  color: ${(props) => (props.thema === 'dark' ? '#fff' : 'black')};
  background-color: ${(props) => (props.thema === 'dark' ? '#234A6D' : '#abf')};

&:hover {
  background-color: ${(props) => (props.thema === 'dark' ? '#3570a6' : '#b0daff')};
  cursor: pointer;
}
`;

export const ContainerPosts = styled.aside`
  display: inline-block;
  width: 50%;
  height: 847px;
  float: left;
  overflow: auto;
  max-height: 847px;
  background-color: ${(props) => (props.thema === 'dark' ? '#17212B' : '#4082bc')};
`;
