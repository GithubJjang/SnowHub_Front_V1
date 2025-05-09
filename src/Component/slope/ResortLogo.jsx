import { styled } from "styled-components";

import duku from "./LogoImage/Duku.png";
import edan from "./LogoImage/Edan.png";
import high1 from "./LogoImage/High1.png";
import gonji from "./LogoImage/Gonji.png";
import oakValley from "./LogoImage/OakValley.png";
import phoenix from "./LogoImage/Phoenix.png";
import vivaldi from "./LogoImage/Vivaldi.png"
import O2 from "./LogoImage/O2.png"
import jisan from "./LogoImage/Jisan.png"
import alpensia from "./LogoImage/Alpensia.png";
import yongpyong from "./LogoImage/yongpyong.png";

const Button = styled.button`
background-image: url(${props => props.image});
background-repeat: no-repeat;
background-size: 100% 100%;

width: 104px; 
height: 104px; 

margin-bottom: 32px;
margin-top: ${props => props.name == "alpensia" ? "20px" : null};
border: none;
background-color: ${props => props.name==props.resort ? "rgb(246,233, 255)": "rgb(232, 241, 255)"};


`


const imageUrl = {
    duku : duku,
    edan : edan,
    high1 : high1,
    gonji : gonji,
    oak : oakValley,
    phoenix : phoenix,
    vivaldi : vivaldi,
    o2 : O2,
    jisan : jisan,
    alpensia : alpensia,
    yongpyong : yongpyong
    
}

function ResortLogo(props){

    const imageResource = imageUrl[props.name];
    const setResort = props.setResort;
    const selectedResort = props.resort; // 지금 API 요청을 보내려고 선택된 리조트 이름.
    

    return(
        <Button image={imageResource} resort={selectedResort}  name={props.name} onClick={()=>{setResort(props.name);}}/>
    )
}

export default ResortLogo;