import "./detail.css"

import { Header, HeaderBody } from "../../header/Header";
import HeaderComponent from "../../header/HeaderComponent"

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../../MangeCookies";


import Logo from "../../header/Logo";
import BlueBarBtn from "./BlueBarBtn";
import ReplyElement from "./ReplyElement";
import OptionBtn from "./OptionBtn";
import {ShowCommentList,HideCommentList} from "./ShowCommentList";


const Boarddetail= ()=>{

    // board와 관련된 variable
    const boardId = useParams();

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [date,setDate] = useState('');
    const [category,setCategory] = useState('');
    const [writer,setWriter] = useState('');
    const [count,setCount] = useState(0);
    
    // reply와 관련된 variable
    const [option,setOption] = useState('최신순'); // 최신순으로? 등록순으로?
    const [reply,setReply] = useState('');
    const [replylist,setReplylist] = useState('');

    // 댓글 등록후, 재랜더링을 위한 변수
    const [refix,setRefix] = useState('');

    // 재랜더링이 될때마다, 백엔드에서 count가 계속 올라감 이를 방지하기 위한 변수
    // 최초 전송시에만 1 그 이후는 0
    const [number,setNumber] = useState(1);

    // 답글 등록
    const [comment,setComment] = useState('');
    const [arr,setArr] = useState([]);// 초기버전
    const [cmt,setCmt] = useState([]);


    useEffect(()=>{

        // Default: 최신순을 가져오자.
        //axios.get('http://localhost:8000/board/detail?id='+boardId.id+'&number='+number,
        axios.get('https://192.168.55.203:443/api/v1/board/detail?id='+boardId.id,
            {
                //params: {name: name},
                headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                //"Access-Control-Allow-Origin": 'http://localhost:3000',
                "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
                'Access-Control-Allow-Credentials':"true",
                'Content-Type': 'application/json'
            }
        }
        )
        .then( // 성공했을떄, 반환이 되는 값
            (Response) => {
            console.log(Response.data);
            setTitle(Response.data.board.title);
            setContent(Response.data.board.content);
            setDate(Response.data.board.createDate);
            setCategory(Response.data.board.category);
            setWriter(Response.data.board.writer);
            setCount(200);

            const tmpArray = Response.data.replylist//replyDTO;
            console.log(tmpArray);
            setReplylist(tmpArray);
            
            // 새로운 컴포넌트를 보여줘야하므로 변경감지가 맞다.
            for(let i = 0; i < tmpArray.length; i++) {
                arr.push(false);
            }
            

            setNumber(0);
            
        }                
        )
        .catch( // 실패, 즉 에러가 발생했을떄 발생.
            (error) => {
                console.log(error)
            }
        )
  
    }
    ,[refix])


    // Replylist Component
    const Replylist = ()=>{
        const result = [];

        for(let i = 0; i < replylist.length; i++) {

            // particle에서 랜더링시 겪은 문제 <- 항상 처음에 데이터를 뿌릴때 undefined라는 문제가 발생을 한다
            // 그러면 예외처리로 해결을 하자. undefine오류가 발생하면 무시하고 아무것도 안보여준다.
            // 그러면 

            result.push(
                
                        <div key={i}>
                            <div className="reply-element">
                                <ReplyElement name={"이름: "+replylist[i].name}/>
                                <ReplyElement name={"작성일: "+replylist[i].createDate}/>
                                <ReplyElement name={"내용: "+replylist[i].content}/>
                                <ReplyElement name={"게시글 번호: "+replylist[i].id}/>
                                

                            
                                <ShowCommentList index={i} replyId={replylist[i].id} arr={arr} cmt={cmt} setCmt={setCmt}/>
                                { arr[i]===true &&   <div>
                                    {commentList(i)}
                                    <textarea className="comment" onChange={(e)=>{setComment(e.target.value)}} placeholder="답글쓰세요"></textarea>
                                    <button onClick={()=>{sendComment(replylist[i].id)}}>답글등록</button>
                                    <HideCommentList index={i} replyId={replylist[i].id} arr={arr} cmt={cmt} setCmt={setCmt}/>
                                </div>}

                            </div>
                        </div>);
            }
            return result;
        }

    // 저장 따로 답글 뿌리는거 따로
    const commentList = (index)=>{
        //console.log(cmt);
        const result = [];

        try{
            
            for(let i = 0; i < cmt[index].length; i++){
                result.push(<div key={i}>{cmt[index][i].content}</div>);
            }  
            
        }
        catch(e){
        }

        return result;
    }

    // reply를 save하는 것보다 useEffect로 가져오는 속도가 더 빠른듯 하다.
    // useCallBack을 써서 함수의 재사용을 고민해보자
    const sendReply = ()=>{
        const empty=[];
        //setRefix(empty);// 수정해야할 부분.

        const formdata = new FormData();
        formdata.append('boardId',boardId.id+'');
        formdata.append('reply',reply);
    
        //axios.post('http://localhost:8000/board/reply',formdata,
        axios.post('https://192.168.55.203:443/api/v1/board/reply',formdata,
            {
                //params: {name: name},
                headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                    //"Access-Control-Allow-Origin": 'http://localhost:3000',
                    "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
                    'Access-Control-Allow-Credentials':"true",
                    'Content-Type': 'application/json'
        }
            
        }).then( // 성공했을떄, 반환이 되는 값
        (Response) => {
            console.log(Response.data);
            setRefix(empty);// save reply -> if success, then get singleBoard
        }                
        )
        .catch( // 실패, 즉 에러가 발생했을떄 발생.
            (error) => {
                console.log(error)
            }
        )
    
    }

    // 답글을 등록하기 위한 컴포넌트.
    // useCallback으로 재사용을 고려
    const sendComment = (replyId)=>{

        const formdata = new FormData();
        formdata.append('content',comment);
      
        axios.post('https://192.168.55.203:443/api/v1/board/comment?id='+replyId,formdata,
                {
                    //params: {name: name},
                    headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                    //"Access-Control-Allow-Origin": 'http://localhost:3000',
                    "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
                    'Access-Control-Allow-Credentials':"true",
                    'Content-Type': 'application/json'
                }
            }
        ).then( // 성공했을떄, 반환이 되는 값
        (Response) => {
            console.log(Response.data);
        }                
        )
        .catch( // 실패, 즉 에러가 발생했을떄 발생.
            (error) => {
                console.log(error)
            }
        )
        

    }

    const page = 
    (
        <div>
            <Header>
                <HeaderBody>
                    <Logo/>
                    <HeaderComponent name="스키장별 슬로프"/>
                    <HeaderComponent name="커뮤니티"/>
                    <HeaderComponent name="회원가입"/>
                </HeaderBody>
            </Header>

            <div id="detail-body">
                <h2>{"<"} Community | 모든 게시글 </h2>

                <div id="detail-container">

                   <div style={
                    {
                        display: "flex",
                        margin: "15px"
                    }
                   }>
                        <h2>{title}</h2>
                        <div style={{ marginLeft: "auto"}}>{category}</div>
                   </div>

                   <div style={{margin: "15px"}}>
                        <p dangerouslySetInnerHTML={{__html: content}}></p>          
                   </div>

                   <div style={{display: "flex"}}>
                    <div style={{margin: "15px", marginTop: "0px"}}>
                        {writer} | {date}
                    </div>
                    <div style={{marginLeft: "auto", marginRight: "15px"}}>
                        {count}
                    </div>
                   </div>
        
                   <div id="blue-bar">
                    <div style={{ margin: "10px",marginLeft: "20px"}}>댓글 {3}</div>
                    <BlueBarBtn><OptionBtn setOption = {setOption} name = {"최신순"} /></BlueBarBtn>
                    |
                    <BlueBarBtn><OptionBtn setOption = {setOption} name = {"등록순"}/></BlueBarBtn>
                   </div>

                   <div style={{margin: "20px"}}>
                    
                    {Replylist()}
                    <textarea placeholder="댓글을 작성해보세요" onChange={(e)=>{setReply(e.target.value)}}></textarea>
                    <button onClick={()=>{sendReply()}}>댓글 등록</button>
                    
                   </div>
                

                </div>

            </div>

        </div>
    );

    return page;
}

export default Boarddetail;

// dangerouslySetInnerHTML -> InnerHtml XSS공격에 취약. 추후 대체제 찾을 것!
// textarea를 잡아줄 div태그가 필요하다. div 안하면 크기 조정을 할 수 없다.
/*
                                <div className="e">{replylist[i].name}</div>
                                <div className="e">{replylist[i].createDate}</div>
                                <div className="e">{replylist[i].content}</div>
                                <div className="e">{replylist[i].id}</div>


                                                                <ReplyElement name={replylist[i].name}/>
                                <ReplyElement name={replylist[i].createDate}/>
                                <ReplyElement name={replylist[i].content}/>
                                <ReplyElement name={replylist[i].id}/>
                                <div>{particle(i)}</div> 
*/

        // 1. 원래코드
        // 게시글 여닫이를 위한 설정.
        //const test = new Array(replylist.length).fill(false);
        //setArr(test);

        //
        //const init = new Array(replylist.length).fill(false);
        //setCmt(init);


/*
    // 버튼을 클릭하면 실행.
    const fetchComment = async (index,replyId)=>{

        
        // 답글을 달기 위한 목적. 각 답글 컴포넌트에 대해서 값을 할당한다.
        // 복사 -> 변경 -> setArr
        //let copy=[...arr];

        if(arr[index]==false){
            // arr[index]=='true'
            //copy[index]=true;
            arr[index]=true;
        }
        else{
            //copy[index]=false;
            arr[index]=false;
        }

        // 여기값을 바로 넣어줘야 함.
        // 바로변경
        //setArr([...copy]);
        //console.log(arr);
  

        try{
            const response = await axios.get('http://localhost:8000/board/reply/comment?id='+replyId,
                    {
                        //params: {name: name},
                        headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                        "Access-Control-Allow-Origin": 'http://localhost:3000',
                        'Access-Control-Allow-Credentials':"true",
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log(response.data);

            let copycmt=[...cmt];// 기존 여러개의 Comment를 그대로 복사.

            copycmt[index]=response.data;// 기존 Comment + 새로 읽은 Comment, 참고로 Reply 번호 = Comments번호. 그래서 관련 Reply,Comment 끼리 묶을 수 있다.

            setCmt(copycmt);
         
            } 
            catch(error){
            console.error(error);
            }
    }

*/