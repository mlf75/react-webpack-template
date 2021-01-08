import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {} from 'antd'

@inject('store')
@observer
class PageTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (<div className='page-title'>
      <h2>{this.props.title}</h2>
      <div className='controls'>
        {this.props.controls}
      </div>
    </div>)
  }
}

export default PageTitle
