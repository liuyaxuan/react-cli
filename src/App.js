import { useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';

// 登录页
import Loginpage from './view/login/index';
// 主页面
import Index from './view/index';
import '../src/mock';

function App() {
  const LOGING_STATUS = sessionStorage.getItem('loginStatus');
  const [isLogin, setIsLogin] = useState(LOGING_STATUS);

  useEffect(() => {
    handleLogin();
    return () => {
    }
  }, [])

  function handleLogin() {
    setIsLogin(sessionStorage.getItem('loginStatus'));
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        Header
      </header> */}
      {
        isLogin ?
          <Index></Index>
        :
          <Loginpage handleLogin={handleLogin} />
      }
    </div>
  );
}

export default App;
