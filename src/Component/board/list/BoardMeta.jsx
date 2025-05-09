// 게시글 구성 데이터를 위한 데이터.

import { styled } from "styled-components";

const MetaDate = styled.div`
    flex-grow: 1;
    text-align: center;
    color: white;
    flex-grow: ${props => props.name=="제목"? 7 : null};
`
;

function BoardMeta(props){

    return(
        <MetaDate>{props.name}</MetaDate>
    )
}

export default BoardMeta;