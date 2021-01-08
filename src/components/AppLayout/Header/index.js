import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import { Badge, Menu, Popconfirm, notification, Button } from "antd";
import {
  PoweroffOutlined,
  DownOutlined,
  BellOutlined,
} from "@ant-design/icons";
import socket from "../../../utils/webscoket";
import io from "socket.io-client";
import { messageUrl } from "../../../utils/constants";
import utils from "Utils/tools";
import {PROJECT_PREFIX} from 'Utils/constants'

// var socketInstance = socket.connect(userId);
// window.socketInstance = socketInstance;

@inject(({ store: { authState, messageState } }) => ({
  authState,
  messageState,
}))
@observer
class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageNum: 0,
      resourceList: [],
      menuList: [],
    };
  }

  componentDidMount() {
    let that = this;
    socket.init({
      onMessage: function(res) {
        console.log(res);
        if (res.flag == 2) {
          //判断是否展示消息弹框
          that.hanldeOpen(res);
        }
        if (res.flag == 1 || res.flag == 2) {
          that.setState({
            messageNum: res.unReadCount,
          });
        }
      },
    });
    var socketInstance = socket.connect(this.props.user.id);
    window.socketInstance = socketInstance;
    //第一次进入页面通过接口获取消息数
    this.getMessageNum();
    this.getResourceList();
  }

  getResourceList = () => {
    this.props.authState.getResourceList().then((rs) => {
      const modules = Object.values(rs);
      if (modules && modules.length) {
        const menuList = this.getMenuList(rs);
        this.setState({
          resourceList: modules,
          menuList,
        });
      }
    });
  };

  getMenuList = (resources) => {
    return Object.entries(resources).map(([key, value]) => {
      const children = value.children.sort(utils.compare("sort"));
      return {
        label: value.title,
        key,
        url: children.length
          ? children[0].url
          : `/${key}`,
        resourceId: value.resourceId,
      };
    });
  };

  componentWillUnmount() {
    //组件销毁主动断开连接,清空状态管理器暂存
    console.log("主动断开连接");
    socketInstance.close();
  }

  getMessageNum = () => {
    let query = {
      readState: 0,
    };
    this.props.messageState.getMessagePage({ ...query }).then((data) => {
      this.setState({
        messageNum: data.total,
      });
    });
  };

  //新消息提醒框
  hanldeOpen = (data) => {
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => this.close(key, data.url, data.businessId, data.megId)}
      >
        查看
      </Button>
    );
    const key = data.megId;
    notification.info({
      message: "您有一条新消息",
      description: data.content,
      placement: "bottomRight",
      duration: 5,
      key,
      // btn
    });
  };

  close = (key, url, businessId, megId) => {
    notification.close(key);
    let _params = [];
    _params.push(megId);
    this.props.messageState
      .updateMessageState({ id: _params.toString() })
      .then((data) => {
        this.getUrl(url, businessId);
      });
  };

  getUrl = (urlId, businessId) => {
    let matchItem = messageUrl.find((item) => item.value == urlId);
    if (matchItem) {
      let url = matchItem.url + "?businessId=" + businessId;
      this.props.history.push(url);
    }
  };

  logout = () => {
    this.props.store.logOut().then((rs) => {
      //登出写死gotoPage
      const { originFrom } = this.props;
      window.location.href = originFrom
        ? `${rs.data.loginPage}?clientId=${rs.data.client}&gotoPage=${`${window
            .location.protocol +
            "//" +
            window.location.host +
            "/initialPage"}`}?originFrom=${originFrom}`
        : `${rs.data.loginPage}?clientId=${rs.data.client}&gotoPage=${`${window
            .location.protocol +
            "//" +
            window.location.host +
            "/initialPage"}`}`;
    });
  };

  renderMenuItem = ({ label, key, resourceId, url }) => {
    const { resourceList } = this.state;
    const { originFrom } = this.props;
    if (utils.hasResourceAuthorize(resourceId, resourceList)) {
      return (
        <Menu.Item key={key}>
          <NavLink to={originFrom ? url + `?originFrom=${originFrom}` : url}>
            {label}
          </NavLink>
        </Menu.Item>
      );
    } else {
      return null;
    }
  };

  render() {
    const user = this.props.user;
    const key = this.props.location.pathname.split("/");
    const { originFrom } = this.props;
    const menuList = this.state.menuList;

    return (
      <div className="c-header">
        <h1 className="project-name">数据资产目录管理系统</h1>
        <Menu mode="horizontal" selectedKeys={key[1]}>
          {menuList.map(this.renderMenuItem)}
        </Menu>
        <ul className="user-info">
          <li className="item user">
            <img className="avatar" src={PROJECT_PREFIX + "/static/images/avatar.png"} alt="" />
            <a
              className="ant-dropdown-link"
              style={{ cursor: "default" }}
              onClick={(e) => e.preventDefault()}
            >
              {user.userAccount} <DownOutlined />
            </a>
          </li>
          <li className="item bell">
            <NavLink
              to={originFrom ? `/message?originFrom=${originFrom}` : "/message"}
              style={{ color: "#fff" }}
            >
              <Badge count={this.state.messageNum} overflowCount={99}>
                <BellOutlined />
              </Badge>
            </NavLink>
          </li>
          <li className="item power-down">
            <Popconfirm
              onConfirm={this.logout}
              placement="left"
              title="确认退出登录吗 ?"
              okText="确定"
              cancelText="取消"
              overlayClassName="pop-confirm"
            >
              <PoweroffOutlined />
            </Popconfirm>
          </li>
        </ul>
      </div>
    );
  }
}

export default AppHeader;
