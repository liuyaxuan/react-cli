import { useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';

// 登录页
import Loginpage from './view/login/index';
// 主页面
import Index from './view/index';
import '../src/mock';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    return () => {
    }
  }, [])

  function handleLogin() {
    setIsLogin(true);
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
