import React, {Component} from 'react'

export default class CommonTitle extends Component {
  render() {
    return (<div className='page-title'>
      <h2>{this.props.title}</h2>
      {
        this.props.btns
          ? this.props.btns
          : null
      }
    </div>)
  }
}
