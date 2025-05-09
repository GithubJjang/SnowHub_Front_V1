import { styled } from "styled-components";

const Selector = styled.button`
    width: 200px;
    height: 50px;
    background-color: ${props => props.selected === props.name ? 'rgb(32,118,191)' : 'white'};
    color: ${props =>props.selected === props.name ? 'white' : 'black'};
    border: 1px solid black;
    margin-right: 1px;
    border-radius: 10px;
    text-align : center;
    font-size: 20px;
`
;

export default Selector;