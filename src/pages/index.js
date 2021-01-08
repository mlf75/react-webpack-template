/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       单页应用的入口文件
 * */

import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Provider } from "mobx-react";
import { hotRehydrate, rehydrate } from "rfx-core";
import moment from "moment";
import { ConfigProvider, notification } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { isProduction, validateMessages } from "../utils/constants";
import "../stores";
import Loadable from "../components/Loadable";

/**
 * 代码拆分和按需加载
 */
const LoadableEntry = Loadable({
  loader: () => import(/* webpackChunkName: "route-message" */ "./Entry"),
});

notification.config({
  duration: 2,
});

/**
 * moment时区设置为中国
 */
moment.locale("zh-cn");

const store = rehydrate();

const renderApp = () => {
  render(
    <Provider
      globalState={store.globalState}
      store={isProduction ? store : hotRehydrate()}
    >
      <Router>
        <ConfigProvider locale={zhCN} form={{ validateMessages }}>
          <LoadableEntry />
        </ConfigProvider>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();
if (module.hot) {
  module.hot.accept(renderApp);
}
