import { stubFalse } from "lodash";

/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       常量
 * */
const isProduction = process.env.NODE_ENV === "production";

const page = { list: [], pages: 1, pageSize: 10, total: 0, pageNum: 1 };

const phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
const ipReg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
const moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
const QqReg = /^[1-9][0-9]{4,9}$/;
const positiveIntegerReg = /^[1-9][0-9]*$/;

const cookie =
  "6816B267BA77FBE7E91555B6BCFC4BB44E44E787229C8EB3EFE2B10DB0FFF1EE9C5DEA2B6CCB8075BED9AB76C5E945A2939E7DFB4823B7FFF2B1DE8A4F2B8E273D204007734800DF11A57DA6BE0CA5E9";

const typeTemplate = "请输入正确格式的${label}";
const validateMessages = {
  required: "${label}不能为空",
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "${label}'为${len}个字符",
    min: "${label}不能少于${min}个字符",
    max: "${label}不能超过${max}个字符",
    range: "${label}在${min}至${max}个字符",
  },
  number: {
    len: "${label}'为${len}",
    min: "${label}不少于${min}",
    max: "${label}最大不超过${max}",
    range: "${label}在${min}-${max}之间",
  },
};

export {
  isProduction,
  page,
  phoneReg,
  ipReg,
  moneyReg,
  QqReg,
  positiveIntegerReg,
  cookie,
  validateMessages
};
