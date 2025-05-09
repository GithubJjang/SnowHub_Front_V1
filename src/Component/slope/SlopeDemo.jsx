import axios from "axios"
import { useEffect, useState } from "react";
import { Header, HeaderBody } from "../header/Header"
import HeaderComponent from "../header/HeaderComponent"
import Logo from "../header/Logo";
import ResortLogo from "./ResortLogo";
import "./style.css";

import title from "./Images/title.png";
import schedulbar from "./Images/schedulebar.png";

import gonjimap from "./Images/gonjimap.png";
import o2map from "./Images/o2map.png";
import jisanmap from "./Images/jisanmap.png";
import phoenxiamp from "./Images/phoenixmap.png";
import alpensiamap from "./Images/alpensaimap.png";
import yongpyongmap from "./Images/yongpyongmap.png";

import { styled } from "styled-components";

function SlopeDemo(){

    const [resort,setResort] = useState("high1");
    const [list,setList] = useState('');
    const [timeline,setTimeline] = useState('day');

    const ClickWeekly = ()=>{
        timeline === 'weekly' ? setTimeline('day') : setTimeline('weekly'); 
    }
    ;
    const ClickNightTime = ()=>{
        timeline === 'nightTime' ? setTimeline('day') : setTimeline('nightTime'); 
    }
    ;
    const ClickLateAtNight = ()=>{
        timeline === 'lateAtNight' ? setTimeline('day') : setTimeline('lateAtNight'); 
    }
    ;

    // 최초 요청시에 high1을 불러옴 -> 그 이후에는 작동을 하지 않는다.
    useEffect(()=>{
        
        axios.get('http://localhost:8080/slope?resort='+resort+'&timeline='+timeline,
        {
                //params: {name: name},
                headers: {
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Access-Control-Allow-Credentials':"true",
                //'Content-Type': 'application/json'
            }
        }
        )
        .then(
            
            // 성공했을떄, 반환이 되는 값
            (Response) => {
            //console.log(Response.data);
            const tmpArray = Response.data;
            setList(tmpArray);
            console.log(tmpArray);

        }                
        ).catch(
            // 실패, 즉 에러가 발생했을떄 발생.
            (error) => {}
            )
    },[resort,timeline])

    const slopeList= ()=>{
        const result = []
        // console.log(list)
        for (let i = 0; i < list.length; i++) {
          result.push(
                      <div key={i} className="content" style={{backgroundColor:"white"}}>
                            <div style={{ textAlign:"center", width: "100px"}}>{list[i].slopeName}</div>
                            <div style={{ textAlign:"center", width: "100px"}}>{list[i].difficulty}</div>
                            <OpenStatus>{list[i].weekly}</OpenStatus>
                            <OpenStatus>{list[i].nightTime}</OpenStatus>
                            <OpenStatus>{list[i].lateAtNight}</OpenStatus>
                      </div>);
        }
        return result;

    }

    const OpenStatus = styled.div`
        text-align:center; 
        width: 100px;
        color: ${(e)=>{return e.children === "Open" ? "green" : (e.children === "Close" ? "red" : "black")}}
    `
    ;

    const SlopeMapUrl = {
        gonji:gonjimap,
        o2:o2map,
        jisan:jisanmap,
        phoenix:phoenxiamp,
        alpensia: alpensiamap,
        yongpyong: yongpyongmap
    }
    ;

    const SlopeMap = (props)=>{

        const imageResource = SlopeMapUrl[props.resort]
       
        return <img src={imageResource} alt="none" style={{
            width : "40%",
            height: "500px"
            
        }}/>

    }
    



    return(
        <div>
            <Header>
                <HeaderBody>
                    <Logo/>
                    <HeaderComponent name="스키장별 슬로프"/>
                    <HeaderComponent name="커뮤니티"/>
                    <HeaderComponent name="회원가입"/>
                </HeaderBody>
            </Header>

                <div id="container">
                    <div id="list">
                        <ResortLogo name="alpensia" resort={resort} setResort={setResort}/>
                        <ResortLogo name="phoenix" resort={resort} setResort={setResort}/>
                        <ResortLogo name="o2" resort={resort} setResort={setResort}/>
                        <ResortLogo name="jisan" resort={resort} setResort={setResort}/>
                        <ResortLogo name="gonji" resort={resort} setResort={setResort}/>
                        <ResortLogo name="yongpyong" resort={resort} setResort={setResort}/>
                       
                    </div>

                    <div id="info">

                        <div id="pinkbox">
                            <div id="title" style={  {border: "none", marginTop: "5px"} }>
                                <img src={title} alt="none"/>
                            </div>

                            <div id="content" style={
                                { marginLeft: "5%", marginRight: "5%", 
                                display: "flex",
                                flexDirection: "row"
                            }
                            }>
                                <div id="schedule" style={
                                    { display: "flex",
                                    flexDirection: "column",
                                    marginRight: "5%"
                                
                                }
                                }>
                      
                                    <div id="schedule_bar" style={
                                            {
                                                background : `url(${schedulbar})`,
                                                backgroundSize: "contain",
                                                backgroundRepeat: "no-repeat",
                                                width: "450px",
                                                height: "76px",
                                                marginBottom: "10px",
                                                display:"grid",
                                                gridTemplateColumns: "1fr 1fr 1fr",
                                                placeItems: "center"
                                            }
                                        }>
                                            <div className="time">
                                                <button onClick={(e)=>{ClickWeekly()}}>주간(09 ~ 15시)</button>
                                            </div>

                                            <div className="time">
                                                <button onClick={(e)=>{ClickNightTime()}}>야간(17 ~ 22시)</button>    
                                            </div>
                                            <div className="time">
                                                <button onClick={(e)=>{ClickLateAtNight()}}>심야(21 ~ 23:30시)</button>
                                            </div>
                                    
                                    </div>
                            
                                    {slopeList()}
                                    
                                    </div>
                                        <SlopeMap resort={resort}/>
                                </div>
                            
                                    <div id="footer">

                            </div>

                        </div>

                    </div>
                </div>


        </div>

    )
}

export default SlopeDemo;