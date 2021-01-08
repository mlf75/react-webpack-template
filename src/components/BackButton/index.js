import React, { Component } from 'react';
import {Button} from "antd"
import {
    LeftOutlined,
  } from '@ant-design/icons'
class BackButton extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={{textAlign:'right'}}>
                <Button onClick={() => this.props.history.goBack()} icon={(<LeftOutlined/>)}>返回</Button>
            </div>
         );
    }
}
 
export default BackButton;