import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Breadcrumb as AntdBreadcrumb} from "antd";
import { matchRoutes } from 'react-router-config';
import PropTypes from "prop-types";
import {breadcrumbNameMap, routers} from "../../router";
import BackButton from "../BackButton"
import {
  EnvironmentOutlined
} from '@ant-design/icons'

@inject("store")
@observer
export default class Breadcrumb extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    const {
      location: {pathname, search},
    } = this.props;
    
    const routes = matchRoutes(routers, pathname)
    const pathSnippets = pathname.split("/").filter(i => i);
    const target = routes.find(item => (item.match && item.match.url) === pathname)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      let url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      let label = breadcrumbNameMap[url]
      if (!label) {
        return null
      }
      if (
        routers.find(({path}) => path === url) ||
        pathSnippets.length === index + 1
      ) {
        if ((target && target.match.params && target.match.params.id) && url === target.match.url) {
          label = target.match.params.id === 'add' ? '新增' : '编辑'
        }
        return (
          <AntdBreadcrumb.Item key={url} className='last'>
            {label}
          </AntdBreadcrumb.Item>
        );
      } else {
        return (
          <AntdBreadcrumb.Item key={url}>
            {breadcrumbNameMap[url]}
          </AntdBreadcrumb.Item>
        );
      }
    });

    return (
      <div style={{ display: 'flex' , alignItems: 'center'}} className='c-breadcrumb'>
        <EnvironmentOutlined/>
        <AntdBreadcrumb style={{margin: "10px 6px"}}>
          {extraBreadcrumbItems}
        </AntdBreadcrumb>
        {this.props.showBackButton == "1" ? <BackButton history={this.props.history} /> : null }
      </div>
    );
  }
}