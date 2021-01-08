import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {toJS} from "mobx";
import { Menu, Button, Layout } from 'antd'
import {Link} from "react-router-dom";
import utils from 'Utils/tools'
import * as Icon from '@ant-design/icons';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

const {Sider} = Layout;
@inject(({store: {authState, systemState}}) => ({authState, systemState}))
@observer
class AppSideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
  //根据后端返回的权限路由渲染侧边栏路由
  renderMenuFromAuthorize = () => {
    const pathkey = this.props.location.pathname.split('/')[1]
    const {resourceList} = this.props.authState
    const {originFrom} = this.props
    let authorizeList = toJS(resourceList) ? toJS(resourceList[pathkey]) : {}
    //根据sort排序
    authorizeList.children = authorizeList.children.sort(utils.compare('sort'))
    return(
      authorizeList && authorizeList.children && authorizeList.children.length ? 
      authorizeList.children.map(item => {
        return(
          <Menu.Item key={item.url} icon={ item.icon ? React.createElement(Icon[(item.icon).trim()]) : null}>
        <Link to={originFrom ? item.url + `?originFrom=${originFrom}` : item.url}>
           <span>{item.title}</span>
        </Link>
      </Menu.Item>
        )
      }):
      null
    )
  }

  render() {
    const key = this.props.location.pathname.split('/').filter(item => item !== '')
    const {resourceList} = this.props.authState
    const authorizeList = toJS(resourceList) ? toJS(resourceList[key[0]]) : []
    const selectedKeys = this.props.location.pathname
    .split("/")
    .splice(0, 3)
    .join("/");
    return authorizeList && authorizeList.children && authorizeList.children.length
      ? (
      <Sider className='c-sidebar' width={250} collapsed={this.state.collapsed}>
      <div className="title">
        <Button type="link" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        {
          this.state.collapsed ? '' : authorizeList.title
        }
      </div>
      {
      <Menu 
        mode="inline" 
        selectedKeys={[selectedKeys]}
      >
        {this.renderMenuFromAuthorize()}
      </Menu>
      }
      </Sider>
    )
      : null
  }
}

export default AppSideBar
