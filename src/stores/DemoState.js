import {action, observable} from "mobx";
import request from "../utils/request";
import {page} from "../utils/constants";

export default class DemoState {
  @observable
  pageList = page

  async getPageList(params) {
    const {data:{data}} = await request({
      config: {
        method: 'GET',
        url: '/api/xxxx',
        params
      }
    })
    this.setPageList(data)
    return data
  }

  @action
  setPageList(data = page) {
    this.pageList = data
  }
  
}