
function OptionBtn(props){

    const setOption = props.setOption;

    return (
        <button onClick={()=>{setOption(props.name)}}>{props.name}</button>
    )
}

export default OptionBtn;