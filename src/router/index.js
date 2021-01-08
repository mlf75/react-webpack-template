/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       配置路由
 * */
import React from "react";
import { Redirect } from "react-router-dom";
import Loadable from "../components/Loadable";

const routers = [
  {
    exact: true,
    path: "/",
    render: () => <Redirect to={"../pages/index.js"} />,
  },
  {
    // 404 页面组件
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "route-no-match" */ "../components/NoMatch"
        ),
    }),
  },
];



export { routers };
