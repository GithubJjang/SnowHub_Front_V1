import { styled } from "styled-components";
import saveImg from "./image/save/Save.png";
import tmpSaveImg from "./image/save/tmpSave.png";
import updateImg from "./image/save/Update.png"
import deleteImg from "./image/save/Delete.png"


const iamgeList = {
    save:saveImg,
    tmpSave:tmpSaveImg,
    update:updateImg,
    delete:deleteImg
}
;

const Btn = styled.button`
    background-size: 100%;
    width: 127px;
    height: 39px;
    border:0;
    background-image: url(${props => props.image});
`
;


function SaveButton(props){
    const image = iamgeList[props.type];

    return(
        <Btn image={image} onClick={props.func}/>
    )
}

export default SaveButton;