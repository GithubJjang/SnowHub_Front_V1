import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './apis/firebase.js';
//import './App.css';

import LoginPage from './Component/login/LoginPage';
import PageNotFound from './Component/error/notFound';
import Logout from './Component/logout';


import Gototest from './Component/member/dummy/axios1';


import BoardList from './Component/board/list/listPage';

import WritePage from './Component/board/write/WritePage';
import Boarddetail from './Component/board/detail/detail';
import AllSlope from './Croll/AllSlope.jsx';
import SlopeDemo from './Component/slope/SlopeDemo.jsx';
import MyBoard from './Component/board/update/personnel.jsx'; // 컴포넌트 이름, 파일 경로로
import BoardUdpate from './Component/board/write/boardUpdate.jsx';
import TmpBoardUpdate from './Component/board/write/TmpBoardUpdate.jsx';
//

function App() {
  // <Route path='/login' element={<LoginControl></LoginControl>} ></Route>
  return(
    // Route에서 등록되지 않음 모든 것은 전부다 '*'으로 이동을 한다.
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<SlopeDemo></SlopeDemo>}></Route>
            <Route path='/login' element={<LoginPage></LoginPage>}></Route>
            <Route path='/logout' element={<Logout></Logout>}></Route>
            <Route path='/board/write' element={<WritePage></WritePage>}></Route>
            <Route path='/board/list' element={<BoardList></BoardList>}></Route>
            <Route path='/board/detail/:id' element={<Boarddetail></Boarddetail>}></Route>
            <Route path='/board/update/:id' element={<BoardUdpate></BoardUdpate>}></Route>
            <Route path='/tmpboard/update/:id' element={<TmpBoardUpdate></TmpBoardUpdate>}></Route>

            <Route path='/info/slopes' element={<AllSlope></AllSlope>}></Route>
            <Route path='/token' element={<Gototest></Gototest>}></Route>
            <Route path='/myboard' element={<MyBoard/>}/>
            



            <Route path='*' element={<PageNotFound></PageNotFound>}></Route> 
        </Routes>
    </BrowserRouter>
);

//  <Route path='/' element={<Index></Index>}></Route>

  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}

export default App;
