// @flow
import React, { Component } from 'react';

type Props = {

}

/**
 * 首页内容渲染
 * @returns
 */
class OverView extends Component<Props> {
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
        <div>测试123</div>
    )
  }
}

export default OverView;
