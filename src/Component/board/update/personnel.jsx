import { useEffect, useState,useRef,useCallback } from "react"
import axios from "axios"
import { getCookie } from "../../MangeCookies";

import {Header,HeaderBody} from "../../header/Header";
import HeaderComponent from "../../header/HeaderComponent";
import Logo from "../../header/Logo";

import Selector from "./SelectBtn";

import styles from "./update.module.css";
import { Link } from "react-router-dom";

const MyBoard = () => {
    const [selected, setSelected] = useState('myboard');
    const [list, setList] = useState([]);
    const [preBot, setPreBot] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();

    const lastElementRef = useCallback(node => {

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMoreBoards();
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore, preBot]);

    // 초기 데이터 로딩
    useEffect(() => {

        // https://192.168.55.203:443
        if(selected=='myboard'){
        //axios.get('http://localhost:8000/api/v1/my/boards', 
        axios.get('https://192.168.55.203:443/api/v1/my/boards', 
            {
            headers: {
                Authorization: 'Bearer ' + getCookie('IdTokenCookie'),
                //'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Origin': 'https://192.168.55.203:443',
                'Access-Control-Allow-Credentials': "true",
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const boards = res.data;
            if (boards.length === 0) {
                setHasMore(false);
                return;
            }

            setList(boards);
            setPreBot(boards[boards.length - 1].id);
        })
        .catch(err => console.log(err));
    }
    else{
        //axios.get('http://localhost:8000/api/v1/tmpboards', 
        axios.get('https://192.168.55.203:443/api/v1/tmpboards', 
            {
            headers: {
                Authorization: 'Bearer ' + getCookie('IdTokenCookie'),
                //'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Origin': 'https://192.168.55.203:443',
                'Access-Control-Allow-Credentials': "true",
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const boards = res.data;
            if (boards.length === 0) {
                setHasMore(false);
                return;
            }
            setList(boards);
            setPreBot(boards[boards.length - 1].id);

        })
        .catch(err => console.log(err));

    }



    }, [selected]);

    // 초기 렌더링 이후, 스크롤을 할 경우.
    const fetchMoreBoards = () => {
        // myboard인 경우 실행
        if(selected==='myboard'){
            // https://192.168.55.203:443
            //axios.get(`http://localhost:8000/api/v1/my/boards?cursor=${preBot}`, 
            axios.get(`https://192.168.55.203:443/api/v1/my/boards?cursor=${preBot}`, 
                {
                headers: {
                    Authorization: 'Bearer ' + getCookie('IdTokenCookie'),
                    //'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Origin': 'https://192.168.55.203:443',
                    'Access-Control-Allow-Credentials': "true",
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                const boards = res.data;
                if (boards.length === 0) {
                    setHasMore(false);
                    return;
                }
    
                setList(prev => [...prev, ...boards]);
                setPreBot(boards[boards.length - 1].id);

            })
            .catch(err => console.log(err));
        }
        else{
            // axios.get(`http://localhost:8000/api/v1/tmpboards?cursor=${preBot}`, 
            axios.get(`https://192.168.55.203:443/api/v1/tmpboards?cursor=${preBot}`, 
                {
                headers: {
                    Authorization: 'Bearer ' + getCookie('IdTokenCookie'),
                    //'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Origin': 'https://192.168.55.203:443',
                    'Access-Control-Allow-Credentials': "true",
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                const boards = res.data;
                if (boards.length === 0) {
                    setHasMore(false);
                    return;
                }
    
                setList(prev => [...prev, ...boards]);
                setPreBot(boards[boards.length - 1].id);
            })
            .catch(err => console.log(err));

        }



    };

    const handleButtonClick = (e) => {
        setSelected(e.target.name);
        // 이 부분에서 selected에 따라 API endpoint 바꿔야 한다면 fetch 함수도 수정 필요
        setList([]);
        setPreBot(null);
        setHasMore(true);
    };

    const DeletedPage = ()=>{
        
        const element = (
            <div> 해당 게시물은 삭제되었습니다.</div>
        )

        return element;
    }

    const Element = (item)=>{


        const myBoardElement = 
        <Link to={`/board/update/${item.item.id}`}>
            <div style={{display:"flex", flexDirection:"row", justifyContent: 'space-between'}}> 
                <div>제목 :  {item.item.title} {item.item.count !==undefined ? '('+item.item.count+')' : null}</div>
                <div>{item.item.createDate}</div>
            </div>
            <div>태그 : {item.item.category}</div>
        </Link>

        const tmpBoardElement = 
            <Link to={`/tmpboard/update/${item.item.id}`}>
            <div style={{display:"flex", flexDirection:"row", justifyContent: 'space-between'}}> 
                <div>제목 :  {item.item.title} {item.item.count !==undefined ? '('+item.item.count+')' : null}</div>
                <div>{item.item.createDate}</div>
            </div>
            <div>태그 : {item.item.category}</div>
        </Link>

        const content = (selected == 'myboard' ? myBoardElement : tmpBoardElement);


        const element = (
            content
        );

        return item.item.state === 'Live' ? element : <DeletedPage/> ;

    }

    return (
        <div>
            <Header>
                <HeaderBody>
                    <Logo />
                    <HeaderComponent name="스키장별 슬로프" />
                    <HeaderComponent name="커뮤니티" />
                    <HeaderComponent name="회원가입" />
                </HeaderBody>
            </Header>

            <div id={styles.body}>
                <h1 id="my-board">내 게시글</h1>

                <Selector name="myboard" selected={selected} onClick={handleButtonClick}>작성한 글</Selector>
                <Selector name="tmpboard" selected={selected} onClick={handleButtonClick}>임시 저장 글</Selector>

                <div id="boards">
                    {list.map((item, index) => (
                       
                        item.state === 'Live' ? 

                        <div key={index} className={styles.element} ref={index === list.length - 1 ? lastElementRef : null}>
                            <Element item={item}/>
                        </div>
                        
                        : null
                        
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBoard;