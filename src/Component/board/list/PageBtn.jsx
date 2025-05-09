import { styled } from "styled-components";

const Button = styled.button`
background-color: rgb(232,241,255);
border:0px;
`
;

//<button className="page_btn" key={i+prefix} onClick={(e)=>{setPage(e.target.value)}} value={i+prefix}>{i+prefix}</button>
function PageNumber(props){
    const i = props.i;
    const prefix = props.prefix;
    const setPage = props.setPage;
    
    return(
        <Button key={i+prefix} onClick={(e)=>{setPage(e.target.value)}} value={i+prefix}>{i+prefix}</Button>
    )

}

// <button className="page_btn" onClick={()=>{setPage(prefix+5)}}>{">"}</button>
function Forward(props){
    const prefix = props.prefix;
    const total = props.total;
    const setPage = props.setPage;

    return(
        prefix+5>total ? null : <Button onClick={()=>{setPage(prefix+5)}}>{">"}</Button>
    )

}
// prefix-5>=0 ? <button className="page_btn" onClick={()=>{setPage(prefix-5)}}>{"<"}</button> : null
function Backward(props){
    const prefix = props.prefix;
    const setPage = props.setPage;

    return(
        prefix-5>=0 ? <Button onClick={()=>{setPage(prefix-5)}}>{"<"}</Button> : null 
        
    )

}

/*
const gotoNext = (
    prefix+5>total ? null : <button className="page_btn" onClick={()=>{setPage(prefix+5)}}>{">"}</button>
)
*/

export {Forward,Backward,PageNumber};