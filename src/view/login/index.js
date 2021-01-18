// @flow
import Axios from 'axios';
import { useState, useEffect} from 'react';

// 请求
import { getPoster } from '../../utils/api';

/**
 * 登录页
 * @returns
 */

const Loginpage = (props) => {
  useEffect(() => {
  }, [])

  function jump() {
    // 登录设置
    // Axios.then(res => {....})
    sessionStorage.setItem("loginStatus", true);
    props.handleLogin();
  }

  return (
      <div onClick={jump}>点击文字跳转...</div>
  );
};

export default Loginpage;
