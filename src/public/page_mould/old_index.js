// @flow
import React, { Component } from 'react';

type Props = {

}

/**
 * 
 * 【**** 组件】
 * 如需使用Hooks的方式进行状态管理，
 * 则使用page_mould文件夹下的index.js这个组件模板。
 * 
 */

class Pagemould extends Component<Props> {
  constructor(props) {
      super(props)
      this.state = {
        loading: false,
      };
  }
  componentDidMount() {
    
  }

  getOverviewData = () => {

  }

  render() {
    const { data, loading } = this.props
    return (
        <div>测试页面1</div>
    )
  }
}

export default Pagemould;
