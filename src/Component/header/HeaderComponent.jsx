import { styled } from "styled-components";

// 여러가지 버튼을 Header에 추가 가능함.
const HeadBtn = styled.button`
    font-size: 20px;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    border: 0;
    outline: 0;
    background-color: rgb(232, 241, 255);
    flex-grow: 1;
    text-align: right;

    margin-left: ${props => props.name=="스키장별 슬로프"?"40%":"0%"}
`


function Header(props){

    return(
        <HeadBtn name={props.name}>{props.name}</HeadBtn>
    )
}

export default Header;