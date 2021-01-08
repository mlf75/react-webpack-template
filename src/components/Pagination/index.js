/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       分页组件
 * */

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Pagination as AntdPagination } from "antd";
import PropTypes from "prop-types";
import "./index.less";

@inject("store")
@observer
export default class Pagination extends Component {
  static propTypes = {
    pageNum: PropTypes.number.isRequired,
    totalElements: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    showSizeChanger: PropTypes.bool,
  };

  static defaultProps = {
    pageNum: 1,
    pageSize: 20,
    showSizeChanger: false,
  };

  onShowSizeChange = (pageNum, pageSize) => {
    const { handleChange } = this.props;
    handleChange({ pageNum, pageSize });
  };

  onChange = (pageNum, pageSize) => {
    const { handleChange } = this.props;
    handleChange({ pageNum, pageSize });
  };

  showTotal = total => `共 ${total || 0} 条`;

  render() {
    const {
      pageSize,
      totalElements,
      showSizeChanger,
      pageNum
    } = this.props;

    return (
      <AntdPagination
        current={pageNum}
        pageSize={pageSize}
        className="rs-pagination"
        showSizeChanger={showSizeChanger || false}
        onShowSizeChange={this.onShowSizeChange}
        showQuickJumper
        onChange={this.onChange}
        showTotal={this.showTotal}
        total={totalElements}
        {...this.props}
      />
    );
  }
}
