import { styled } from "styled-components";

const Wrapper = styled.div`
    margin-bottom: 10px;
    word-break: break-all;
`
;

function ReplyElement(props){
    return(
        <Wrapper>{props.name}</Wrapper>
    )
}
;

export default ReplyElement;




