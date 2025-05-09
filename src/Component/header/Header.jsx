import { styled } from "styled-components";

// 여러 페이지에서 이 Header attribute를 재사용할 가능성이 높다 -> 컴포넌트로 만듦.
const Header = styled.div`
    height: 72px;
    background-color: rgb(232, 241, 255);
    display: flex;
    align-items: center; /* 수직 가운데 정렬 */
`
;
/*justify-content: center;  수평 가운데 정렬 */

const HeaderBody = styled.div`
    display: flex;
    flex-grow: inherit;
    width:  60vw;
    margin-left: 20%;
`
;

export {Header,HeaderBody};