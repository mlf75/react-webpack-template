import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import {Breadcrumb} from "antd";
import uuid from "uuid/v1";
import BackButton from "../BackButton"
import {
  EnvironmentOutlined
} from '@ant-design/icons'

@inject("store")
@observer
class HlBreadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const items = this.props.breadcrumb.map(item => {
      if (item.path) {
        return (
          <Breadcrumb.Item key={uuid}>
            <Link to={item.path}>{item.name}</Link>
          </Breadcrumb.Item>
        );
      }
      return <Breadcrumb.Item className='last' key={uuid}>{item.name}</Breadcrumb.Item>;
    });

    return (
      <div className='page-breadcrumb'>
        <EnvironmentOutlined/>
        <Breadcrumb separator={this.props.separator} className="c-breadcrumb">
          {items}
        </Breadcrumb>
        <BackButton history={this.props.history} />
      </div>
    );
  }
}

export default HlBreadcrumb;
