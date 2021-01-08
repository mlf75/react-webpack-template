/**
 * Date              Author           Des
 *----------------------------------------------
 * 2018/8/10           gongtiexin       通用搜索表格组件
 * */

import React, {Component, Fragment} from "react";
import {observer} from "mobx-react";
import uuid from 'uuid'
import PropTypes from "prop-types";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Table,
  Select,
  DatePicker,
  Tabs
} from "antd";
import Pagination from "../Pagination";
import "./index.less";
import utils from "Utils/tools";

const {Item: FormItem} = Form;
const {Option: SelectOption} = Select;
const {RangePicker} = DatePicker;
const {TabPane} = Tabs
@observer
export default class SearchTable extends Component {
  state = {
    groupId: null,
    groupName: null
  }
  static propTypes = {
    form: PropTypes.object,
    fields: PropTypes.any,
    dividerProps: PropTypes.object,
    tableProps: PropTypes.object.isRequired,
    paginationProps: PropTypes.any,
    callback: PropTypes.func,
    operators: PropTypes.any, // 额外操作
    tabsProps: PropTypes.any
  };

  static defaultProps = {
    operators: null,
    fields: [],
    hasReset: true,
    dividerProps: {orientation: "left"},
  };
  
  formRef = React.createRef();

  componentDidMount() {
    if (this.props.operators) {
      this.props.onRef(this)
    }
  }

  handleReset = () => {
    this.formRef.current.resetFields();
  };

  getDataSource = (params) => {
    const {
      callback,
      fields
    } = this.props;
    if (fields && fields.length) {
      const search = this.formRef.current.getFieldsValue();
      const requestData = {...search, ...params}
      Object.entries(requestData).forEach(([key, value]) => {
        if (typeof value === "string") {
          requestData[key] = utils.trim(value);
        }
      });
      callback(requestData);
    } else {
      callback({...params});
    }
  };

  renderFormItem = fields =>
    fields.map(
      ({
         type,
         key,
         label,
         options,
         items = [],
         props,
         span = 6
       }) => {
        switch (type) {
          case "Input": {
            return (
              <Col key={key} span={span} className='field-col'>
                <FormItem label={label} name={key}>
                  <Input {...props} />
                </FormItem>
              </Col>
            );
          }
          case "Select": {
            return (
              <Col key={key} span={span} className='field-col'>
                <FormItem label={label} name={key}>
                  <Select {...props} >
                    {items.map(item => (
                      <SelectOption
                        key={item.key || item.value}
                        value={item.value}
                      >
                        {item.label}
                      </SelectOption>
                    ))}
                  </Select>
                </FormItem>
              </Col>
            );
          }
          case "RangePicker": {
            return (
              <Col key={key} span={span} className='field-col'>
                <FormItem label={label} name={key}>
                  <RangePicker {...props} />
                </FormItem>
              </Col>
            );
          }
          default:
            return null;
        }
      }
    );

  // 获取表单的初始值 {fieldName: xxx}
  getInitialValue = (fields) => {
    const obj = {}
    fields.forEach(({
        key,
        initialValue
      }) => {
      obj[key] = initialValue
    })
    return obj
  }

  render() {
    const {
      fields = [],
      operators,
      tableProps,
      paginationProps,
      hasReset,
      controlBtnProps,
      tabsProps
    } = this.props;
    return (
      <div id="searchTable">
        {
          controlBtnProps && controlBtnProps.position === 'top'
            ? (
              <div className="btn-groups">
                {controlBtnProps.dom}
              </div>
            )
            : null
        }
        {do {
          if (fields.length > 0) {
            <Fragment>
              <Form
                ref={this.formRef}
                className="ant-advanced-search-form"
                onFinish={this.getDataSource}
                initialValues={this.getInitialValue(fields)}
              >
                <Row gutter={15}>
                  {this.renderFormItem(fields)}

                  <Col>
                    <FormItem className='field-controls'>
                      {
                        operators ? operators : null
                      }
                      <Button type="primary" htmlType="submit">
                        搜索
                      </Button>
                      {
                        hasReset
                          ? (<Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>)
                          : null
                      }
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Fragment>;
          }
        }}
        {
          controlBtnProps && controlBtnProps.position === 'middle'
            ? (
              <div className="btn-groups">
                {controlBtnProps.dom}
              </div>
            )
            : null
        }
        {
          tabsProps && tabsProps.length > 1
            ? (
              <Tabs defaultActiveKey={tabsProps.defaultActiveKey} onChange={tabsProps.onChange} activeKey={tableProps.activeKey} >
                {tabsProps.tabPanes.map(item => {
                  return <TabPane tab={item.name} key ={item.key} />
                })}
              </Tabs>
            )
            :null
        }
        <Table size="small" pagination={false} bordered={true} {...tableProps} />
        {paginationProps ? (
          <Pagination {...paginationProps} handleChange={this.getDataSource}/>
        ) : null}
      </div>
    );
  }
}
