import { styled } from "styled-components";

const Button = styled.button`
    margin-right: 10px;
`
;

function CategoryBtn(props){

    const setCategory = props.categoryFun;
    const setPage = props.pageFun;

    return(
        <Button value={props.category} onClick={(e)=>{setCategory(e.target.value); setPage(0);}}>
            {props.category}
        </Button>
    )

}

export default CategoryBtn;