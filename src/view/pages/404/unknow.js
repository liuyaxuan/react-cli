// @flow
import React, { Component } from 'react';

type Props = {

}

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
        <div>404</div>
    )
  }
}

export default Pagemould;
