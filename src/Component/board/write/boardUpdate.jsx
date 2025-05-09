import "./write.css";
//import Editor from "./Editor";


import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getCookie, setCookie } from '../../MangeCookies';
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import ImageResize from 'quill-image-resize';
import axios from 'axios';
import CategoryButton from "./CategoryButton"
import SaveButton from "./SaveButton";
import ImageHandler  from "./ImageHandler";

import {FooterContainer,FooterCategory,FooterSaveBtn} from "./Footer"; // Footer Deco Components

import HeaderComponent from "../../header/HeaderComponent"
import {Header,HeaderBody} from "../../header/Header"
import Logo from "../../header/Logo";
import {modules,formats} from "./QuillConfig";

Quill.register('modules/ImageResize', ImageResize);

const BoardUdpate = ()=>{

    // 외부로 꺼내 전역변수처럼 사용을 하자.

    // board와 관련된 variable
    const boardId = useParams();

    console.log(boardId.id);

    // 리액트에서는 input과 같이 uncontrolled 하는 것은 항시 초기화를 하려고 한다.
    const [content,setContent] =  useState('');// 변경감지를 위한 변수 선언
    const [title,setTitle] = useState('');
    const [category,setCategory] = useState('');

    const quillRef = useRef(null); // 현재값을 초기화. useRef가 변한다고 재렌더링 안함 <- 렌더를 안할 요소에 대해서 사용하자.

    const navigate = useNavigate();
    // ReactQuill: 여기서 복잡하더라도 추가를 해야 버튼을 원하는 위치에 붙일수 있음. 아니면 할 방법이x( title, content 어떻게 반환??? )


            useEffect(()=>{ // 첫 마운트시에만 활성이 된다. 왜냐하면 이 기능은 항상 유지됨.
              if (quillRef.current) {
                const toolbar = quillRef.current.getEditor().getModule('toolbar');
                toolbar.addHandler('image', ()=>{ImageHandler(quillRef)}); // 익명함수 안쓰면 Click이 아닌 항상 activate로 간주를 한다.
            }
            },[])


            // /board/list시 옛날 글로 먼저 채우기기
            useEffect(()=>{
                
                //'https://192.168.55.203:443',
                //axios.get('http://localhost:8000/api/v1/my/board?id='+boardId.id,
                axios.get('https://192.168.55.203:443/api/v1/my/board?id='+boardId.id,
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
                
                  setTitle(Response.data.body.title);
                  setContent(Response.data.body.content);
                  setCategory(Response.data.body.category);
              }                
              )
              .catch( // 실패, 즉 에러가 발생했을떄 발생.
                  (error) => {
                      console.log(error)
                  }
              )
            },[]);
            
            
    const Editor = ()=> {
 
          return (
            <div id="editor">
      
                <div id="title">
                    <input type="text" name="title" onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder="제목을 입력하세요"/>
                </div>
      
                <div id="content" >
                   
                    <ReactQuill 
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                placeholder="남기고 싶은 기록을 자유롭게 적어주세요."
                                value={content}
                                onChange={(e)=>{setContent(e)}}
                                ref={quillRef}
                                >
                    </ReactQuill>
                  
                    
                </div>
      
            </div>
            
            
             
          );
            // 익명함수를 변수선언한 후, 괄호를 붙이면 바로 실행이 된다.
      
      }
    // 전송 컴포넌트
    const updateCallback = useCallback((title,content,category)=>{
        console.log("update");

        const formData = new FormData();
        formData.append('id',boardId.id);
        formData.append('title',title);
        formData.append('content',content);
        formData.append('category',category);

        //axios.put('http://localhost:8000/api/v1/my/update/board',formData,
        axios.put('https://192.168.55.203:443/api/v1/my/update/board',formData,
          {
            //params: {name: name},
            headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
            //"Access-Control-Allow-Origin": 'http://localhost:3000',
            "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
            'Access-Control-Allow-Credentials':"true",
            'Content-Type': 'application/json'
        }
      
        })
        .then(
            // 성공했을떄, 반환이 되는 값
            (Response) => {
            alert(Response.data.message);
            
        }                
        )
        .catch(
          // 실패, 즉 에러가 발생했을떄 발생.
          (error) => {
              // 1. 인증되지 않은 토큰으로 접근을 한 경우, loginPage로 보내버리기
              if(error.response.data.error==='Failed to parse Firebase ID token. Make sure you passed a string that represents a complete and valid JWT. See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.'){
                  
                  navigate('/login');
              }
              // 2. FirebaseToken이 맞으나, 만료가 된 경우, accessToken과 refreshToken 두개를 동시에 다시 한번 더 보내자.
              else if(error.response.data.error==='Firebase ID token has expired. Get a fresh ID token and try again. See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.'){
                  console.log("do again");
                  //axios.post('http://localhost:8000/board/write',formData,
                  axios.post('https://192.168.55.203:443/api/v1/board/write',formData,
                  {
                      //params: {name: name},
                      headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                                RefreshToken: 'Bearer '+getCookie('refreshTokenCookie'),
                      //"Access-Control-Allow-Origin": 'http://localhost:3000',
                      "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
                      'Access-Control-Allow-Credentials':"true",
                      'Content-Type': 'application/json'
                  }
                  
                  }
                  )
                  .then(
                      // 성공했을떄, 반환이 되는 값
                      (Response) => {
                      //console.log(Response);
      
                      //removeCookie('IdTokenCookie');
                      //removeCookie('refreshTokenCookie');

                      setCookie('IdTokenCookie',Response.headers.accesstoken);
                      setCookie('refreshTokenCookie',Response.headers.refreshtoken);
                      
                  }                
                  )
              }
              //console.log(error.headers);
              
      
          }
      );
      
      },[])
    const deleteCallback = useCallback((title,content,category)=>{ // 그거 컴포넌트 destroy써봐야겠다.

        //axios.delete('http://localhost:8000/api/v1/board/'+boardId.id,
        axios.delete('https://192.168.55.203:443/api/v1/board/'+boardId.id,
          {
            //params: {name: name},
            headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
            //"Access-Control-Allow-Origin": 'http://localhost:3000',
            "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
            'Access-Control-Allow-Credentials':"true",
            'Content-Type': 'application/json'
        }
      
        })
        .then(
            // 성공했을떄, 반환이 되는 값
            (Response) => {
            console.log(content);
            alert(Response.data);
            
        }                
        )
        .catch(
          // 실패, 즉 에러가 발생했을떄 발생.
          (error) => {
              // 1. 인증되지 않은 토큰으로 접근을 한 경우, loginPage로 보내버리기
              if(error.response.data.error==='Failed to parse Firebase ID token. Make sure you passed a string that represents a complete and valid JWT. See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.'){
                  
                  navigate('/login');
              }
              // 2. FirebaseToken이 맞으나, 만료가 된 경우, accessToken과 refreshToken 두개를 동시에 다시 한번 더 보내자.
              else if(error.response.data.error==='Firebase ID token has expired. Get a fresh ID token and try again. See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.'){
                 
                //axios.delete('http://localhost:8000/api/v1/board/'+boardId.id,
                axios.delete('https://192.168.55.203:443/api/v1/board/'+boardId.id,
                    {
                      //params: {name: name},
                      headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                      //"Access-Control-Allow-Origin": 'http://localhost:3000',
                      "Access-Control-Allow-Origin": 'https://192.168.55.203:443',
                      'Access-Control-Allow-Credentials':"true",
                      'Content-Type': 'application/json'
                  }
                
                  })
                  .then(
                      // 성공했을떄, 반환이 되는 값
                      (Response) => {

      
                      //removeCookie('IdTokenCookie');
                      //removeCookie('refreshTokenCookie');

      
                      setCookie('IdTokenCookie',Response.headers.accesstoken);
                      setCookie('refreshTokenCookie',Response.headers.refreshtoken);
                      
                  }                
                  )
              }

          }
      );

    }
    ,[]);

    // 결과물 페이지 반환
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

            <div id="community_body">
                <h2>{"<"} Community | 게시글 작성하기 </h2>
                <div id="bigbox">

                    <h2 id="write_my_board">나의 게시글 작성하기</h2>
                    {Editor()}
                        
                    <FooterContainer>
                        <FooterCategory>
                            <CategoryButton type={"season"} func={()=>{setCategory('Season')}}/>
                            <CategoryButton type={"smalltalk"} func={()=>{setCategory('smallTalk')}}/>
                            <CategoryButton type={"share"} func={()=>{setCategory('Share')}}/>
                            <CategoryButton type={"review"} func={()=>{setCategory('Review')}}/>
                        </FooterCategory>
                        <FooterSaveBtn>
                            <SaveButton type="delete" func={()=>{deleteCallback()}}/>
                            <SaveButton type="update" func={()=>{updateCallback(title,content,category)}}/>
                        </FooterSaveBtn>
                    </FooterContainer>
                    

                </div>
            </div>
        </div>
    );

    return page;

}

export default BoardUdpate;


                        