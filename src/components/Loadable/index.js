/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       react-loadable
 * */

import React from "react";
import ReactLoadable from "react-loadable";
import PropTypes from "prop-types";
import "./index.less";

const Loading = ({ isLoading, error, timedOut, pastDelay }) => {
  if (error) {
    alert(error)
    return (
      <div className="loadable-box">
        <p>Error!</p>
      </div>
    );
  }
  if (timedOut) {
    return (
      <div className="loadable-box">
        <p>接口耗时较长, 请耐心等待...</p>
      </div>
    );
  }
  if (pastDelay) {
    return (
      <div className="loadable-box">
        <p>数据加载中...</p>
      </div>
    );
  }
  // if (isLoading) {
  //   return (
  //     <div className="loadable-box">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }
  return null;
};

Loading.propTypes = {
  error: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
};

Loading.defaultProps = {
  error: false,
  timedOut: false,
  pastDelay: false,
};

const Loadable = opts =>
  ReactLoadable({
    loading: Loading,
    delay: 300,
    timeout: 10000,
    ...opts,
  });

export default Loadable;
