import { styled } from "styled-components";
import axios from "axios";
import { getCookie } from "../../MangeCookies";

const ShowButton = styled.button`

display: ${props => props.status == false ? "block" : "none"}
`
;

const HideButton = styled.button`

`

;

function ShowCommentList(props){

    // 변수
    const index = props.index;
    const replyId= props.replyId;
    const arr = props.arr;

    // 부모 useState 끌어옴.
    const cmt = props.cmt;
    const setCmt = props.setCmt;

    

    // 버튼을 클릭하면 실행.
    const fetchComment = async (index,replyId)=>{

        // 댓글보기, 숨기기를 위한 설정
        if(arr[index]==false){

            arr[index]=true;
        }
        else{
            //copy[index]=false;
            arr[index]=false;
        }

        try{
           // const response = await axios.get('http://localhost:8000/board/reply/comment?id='+replyId,
              const response = await axios.get('https://192.168.55.203:443/api/v1/board/reply/comment?id='+replyId,
                    {
                            //params: {name: name},
                        headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                        //"Access-Control-Allow-Origin": 'http://localhost:3000',
                        "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
                        'Access-Control-Allow-Credentials':"true",
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            console.log(response.data.data);
    
            let copycmt=[...cmt];// 기존 여러개의 Comment를 그대로 복사.
    
            copycmt[index]=response.data.data;// 기존 Comment + 새로 읽은 Comment, 참고로 Reply 번호 = Comments번호. 그래서 관련 Reply,Comment 끼리 묶을 수 있다.
    
            setCmt(copycmt);
             
            } 
            catch(error){
            console.error(error);
            }
    }

    return(
        <ShowButton onClick={()=>{fetchComment(index,replyId)}} status={arr[index]}>{arr[index]==false?'답글달기':'숨기기'}</ShowButton>
    )
    ;
}

function HideCommentList(props){

    // 변수
    const index = props.index;
    const replyId= props.replyId;
    const arr = props.arr;

    // 부모 useState 끌어옴.
    const cmt = props.cmt;
    const setCmt = props.setCmt;

    

    // 버튼을 클릭하면 실행.
    const fetchComment = async (index,replyId)=>{

        // 댓글보기, 숨기기를 위한 설정
        if(arr[index]==false){

            arr[index]=true;
        }
        else{
            //copy[index]=false;
            arr[index]=false;
        }

        try{
            //const response = await axios.get('http://localhost:8000/api/v1/board/reply/comment?id='+replyId,
                const response = await axios.get('https://192.168.55.203:443/api/v1/board/reply/comment?id='+replyId,
                    {
                            //params: {name: name},
                        headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                        //"Access-Control-Allow-Origin": 'http://localhost:3000',
                        "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
                        'Access-Control-Allow-Credentials':"true",
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            console.log(response.data.data);
    
            let copycmt=[...cmt];// 기존 여러개의 Comment를 그대로 복사.
    
            copycmt[index]=response.data.data;// 기존 Comment + 새로 읽은 Comment, 참고로 Reply 번호 = Comments번호. 그래서 관련 Reply,Comment 끼리 묶을 수 있다.
    
            setCmt(copycmt);
             
            } 
            catch(error){
            console.error(error);
            }
    }

    return(
        <HideButton onClick={()=>{fetchComment(index,replyId)}}>{arr[index]==false?'답글달기':'숨기기'}</HideButton>
    )
    ;
}

export {ShowCommentList, HideCommentList};