import { styled } from "styled-components";

const SnowHub = styled.div`
    font-size: 24px; 
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
`
;

function Logo(){
    return(
        <SnowHub>Snowhub</SnowHub>
    )
}

export default Logo;