// @flow
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
    props.handleLogin();
  }

  return (
      <div onClick={jump}>点击文字跳转...</div>
  );
};

export default Loginpage;
