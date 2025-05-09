import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';

import { getCookie } from "../../MangeCookies";
import "../../pageheader/header.css";
import "./list.css";

import {EventSourcePolyfill} from "event-source-polyfill";

import CategoryBtn from "./CategoryBtn";
import BoardMeta from "./BoardMeta";
import {Header,HeaderBody} from "../../header/Header";
import HeaderComponent from "../../header/HeaderComponent";
import Logo from "../../header/Logo";
import { Backward, Forward, PageNumber } from "./PageBtn";

import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 8rem;
  left: 47%;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0,200,102);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 27px;
    transition : 0.5s
  }
`;

const Desc = styled.div`
  //설명 부분의 CSS를 구현
  text-align: center;
  margin: 20px;
`;

const Toggle = (messages,setMessages,control,setControl,alarm,setAlarm) => {

    // 첫 페이지 업로드할때만 1이다.
    console.log("alarm: "+alarm);
  
    const [isOn, setisOn] = useState(false);
  
    if(messages.length!==0 && control==0){
  
      const newList = messages.filter((e)=>e.id==0);
  
      JSON.parse(messages[0]).myQueue.forEach(e => {
        newList.push(e);
      });
  
      setMessages(newList);
  
      setControl(1);
      
    }
  
    const toggleHandler = () => {
      // isOn의 상태를 변경하는 메소드를 구현
      setisOn(!isOn);
      if(alarm==1){
        setAlarm(0);
      }
  
    };
  
    return (
      <>
        <ToggleContainer
          // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
          onClick={toggleHandler}
        >
          {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
          {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
          <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}/>
          <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`}/>
        </ToggleContainer>
        {/* Desc 컴포넌트를 활용*/}
        {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 'Toggle Switch ON'으로, 그렇지 않은 경우 'Toggle Switch OFF'. 조건부 렌더링을 활용. */}
        {alarm==1 ? <h1>New Message</h1> : <h1>Already Read</h1>}
        {isOn === false ?
        <Desc><div className='OFF'>FEJIGU Toggle Switch OFF</div></Desc> :
        messages.length!==0 ?
   
        <div>
           <ul>
          {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
          ))}
          </ul>
  
  
        </div>
        : null
  
  
        }
  
      </>
    );
  };








// 실행순서: 빈배열 렌더링 -> useEffect ->list에 변경감지 -> list와 관련된 부분 재랜더링
const BoardList = ()=>{
    const [list,setList] = useState('');
    const [page,setPage] = useState(0); // 첫페이지는 항상 0
    const [total,setTotal] = useState('');
    const [category,setCategory] = useState('all');

    const[messages,setMessages] = useState([]);
    const[control,setControl] = useState(0);
    const[alarm,setAlarm] = useState(0);// 1은 alram 상태, 0은 꺼진 상태


    
    useEffect(()=>{

        // axios.get('http://192.168.55.203:1006/board/list?page='+page+'&category='+category,
        // const eventSource = new EventSource('http://192.168.55.203:1006/board/list/streams',
        const EventSource = EventSourcePolyfill;
        //const eventSource = new EventSource('http://192.168.0.2:8000/board/list/streams',
        const eventSource = new EventSource('https://192.168.55.203:443/board/list/streams',
        {
          headers: {
            Authorization: 'Bearer '+getCookie('IdTokenCookie'),
            "Access-Control-Allow-Origin": 'http://localhost:3000',
            //"Access-Control-Allow-Origin": 'http://192.168.55.203:3000',
            'Access-Control-Allow-Credentials':"true"
          },
          //withCredentials: true,
        });

        // 접속을 성공할 경우 message를 받아온다.
        eventSource.addEventListener("message", (event) => {
            console.log(event);
            setMessages((prevMessages) => [...prevMessages, event.data]);
            setAlarm(1);
    
          });
        
        // 실패하면 끊어버린다.
        eventSource.onerror = () => {
        console.log("연결해지");
          eventSource.close(); //연결 끊기
        };
    
      },[])
      
      

    // deps에 특정값을 넣게 되면 컴포넌트가 mount 될 때 -> 지정한 값이 업데이트될 때 useEffect를 실행합니다.
    useEffect(()=>{
        //console.log(category);
        console.log("accessToken 입니다: "+getCookie('IdTokenCookie'));
        // 아래 코드는 backend에서 data를 가져오는 것임. springboot로 접근
        //axios.get('http://192.168.55.203:1006/board/list?page='+page+'&category='+category,
        //"Access-Control-Allow-Origin": 'https://192.168.55.203:443'

        // 'http://localhost:80/board/list?page='+page+'&category='+category 내부 docker
        // axios.get('http://localhost:8000/board/list?page='+page+'&category='+category, (로컬 테스트)

        //axios.get('http://localhost:8000/board/list?page='+page+'&category='+category,

        // /back/board/list
        // axios.get('http://192.168.55.203:1006/board/list?page='+page+'&category='+category,
        axios.get('https://192.168.55.203:443/api/v1/board/list?page='+page+'&category='+category,
        {
                //params: {name: name},
                headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                //"Access-Control-Allow-Origin": 'http://localhost:3000',
                "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
                //"Access-Control-Allow-Origin": 'http://192.168.55.203:3000',
                'Access-Control-Allow-Credentials':"true",
                'Content-Type': 'application/json'
            }
        }
        )
        .then(
            
            // 성공했을떄, 반환이 되는 값
            (Response) => {
            console.log(Response.data);
            const tmpArray = Response.data;
            const getTotalPage = tmpArray.pop();
            setTotal(getTotalPage.id);  
            setList(tmpArray);
            console.log(tmpArray);
        }                
        ).catch(
            // 실패, 즉 에러가 발생했을떄 발생.
            (error) => {
                console.log(error);
                console.log(error.data);
            }
            )
    },[page,category])

    const pagination = ()=>{

        const prefix = parseInt(page/5)*5;

        // 페이지네이션 넘버. 1,2,3,4,5
        const buttonList = [];
        let i=0
        while(i<5){
            if(i+prefix>=total){
                break;
            }
            buttonList.push(<PageNumber i={i} prefix={prefix} setPage={setPage}/>);
            i++;
        }


        
        /*
            {weekArr.map((week, index) => (
            <span key={index}>
            {week}
            </span>
        ))}
        */
        // 이전 페이지네이션으로 이동
        // 다음 페이지네이션으로 이동()
        const pagination_frame = (

            <div id="pagination">
                  <div id="pagination_bar">
                    <Backward setPage={setPage} prefix={prefix}/>

                    {buttonList.map((number,index) => (
                        <div key={index}>
                            {number}
                        </div>
                    ))
                    }

                    <Forward setPage={setPage} total={total} prefix={prefix}/>
                </div>
            </div>

        );

        return pagination_frame;
        
    }

    const boards = () => {
        const result = [];
        for (let i = 0; i < list.length; i++) {
          result.push(
                      <div key={i} className="content">
                            <Link className="just_align_center" to={`/board/detail/${list[i].id}`}>{list[i].category}</Link>
                            <Link className="just_align_left" to={`/board/detail/${list[i].id}`}>{list[i].title}</Link>
                            <Link className="just_align_center" to={`/board/detail/${list[i].id}`}>{list[i].writer}</Link>
                            <Link className="just_align_center" to={`/board/detail/${list[i].id}`}>{list[i].createDate}</Link>
                            <Link className="just_align_center" to={`/board/detail/${list[i].id}`}>{list[i].count}</Link>
                      </div>);
        }
        return result;
      };




    const body=(
        <div id="community_body">
            <h2>Community</h2>
            <div id="select">
               <CategoryBtn category="all" categoryFun={setCategory} pageFun={setPage}/>
               <CategoryBtn category="Season" categoryFun={setCategory} pageFun={setPage}/>
               <CategoryBtn category="smallTalk" categoryFun={setCategory} pageFun={setPage}/>
               <CategoryBtn category="Share" categoryFun={setCategory} pageFun={setPage}/>
               <CategoryBtn category="Review" categoryFun={setCategory} pageFun={setPage}/>
            </div>

            <div id="board_main">

                <h2 id="all_posts">모든 게시글</h2>

                <div id="board_list_items">
                    <BoardMeta name="제목"/>
                    <BoardMeta name="작성자"/>
                    <BoardMeta name="작성일"/>
                    <BoardMeta name="조회수"/>
                </div>

                <div id="board_frame">
                    {boards()}
                </div>    

            </div>
            
            {pagination()}

        </div>
    );

    return (
        
            <div>
                {Toggle(messages,setMessages,control,setControl,alarm,setAlarm)}
                <Header>
                    <HeaderBody>
                        <Logo/>
                        <HeaderComponent name="스키장별 슬로프"/>
                        <HeaderComponent name="커뮤니티"/>
                        <HeaderComponent name="회원가입"/>
                    </HeaderBody>
                </Header>
                {body}
            </div>
        
    );
}


export default BoardList;
/*
    <button className="select_component" value={"all"} onClick={(e)=>{setCategory(e.target.value); setPage(0)}}>[모든 게시글]</button>
    <button className="select_component" value={"Season"} onClick={(e)=>{setCategory(e.target.value); setPage(0)}}>[시즌방]</button>
    <button className="select_component" value={"smallTalk"} onClick={(e)=>{setCategory(e.target.value); setPage(0)}}>[스몰토크]</button>
    <button className="select_component" value={"Share"} onClick={(e)=>{setCategory(e.target.value); setPage(0)}}>[정보공유]</button>
    <button className="select_component" value={"Review"} onClick={(e)=>{setCategory(e.target.value); setPage(0)}}>[사용후기]</button>

    <div id="first" className="element1">제목</div>
    <div className="element1">작성자</div>
    <div className="element1">작성일</div>
    <div className="element1">조회수</div>

        const gotoNext = (
            prefix+5>total ? null : <button className="page_btn" onClick={()=>{setPage(prefix+5)}}>{">"}</button>
        )

        const gotoPre = (
            prefix-5>=0 ? <button className="page_btn" onClick={()=>{setPage(prefix-5)}}>{"<"}</button> : null
        )

        buttonList.push(<button className="page_btn" key={i+prefix} onClick={(e)=>{setPage(e.target.value)}} value={i+prefix}>{i+prefix}</button>);
*/