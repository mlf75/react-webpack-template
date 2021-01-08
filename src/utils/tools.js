/**
 * @author      mlf
 * @date        2018-08-03
 * @description
 */

export default {
  trim(str) {
    if (!str) {
      return "";
    }
    str = String(str).replace(/^\s+/, "");
    for (let i = str.length - 1; i >= 0; i -= 1) {
      if (/\S/.test(str.charAt(i))) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return str;
  },

  /*
   * 手机号码显示格式处理
   * @phone 需要进行格式化的手机号码
   * @split 分隔符
   * 15111811893 => 151-1181-1893
   * */
  formatPhone(phone, split) {
    const phoneArr = phone && phone.split("").reverse();
    let result = "";
    phoneArr &&
      phoneArr.forEach((item, index) => {
        if ((index + 1) % 4 === 0) {
          result = `${split}${item}` + result;
        } else {
          result = item + result;
        }
      });
    return result;
  },

  // '123456789' => "123,456,789"
  split3Num(str) {
    if ((str && str.toString) || typeof str === "number") {
      str = str.toString();
    }
    let result = "";
    if (str && str.length) {
      for (let i = 0; i < str.length; i++) {
        result += str[i];
        if ((i + 1) % 3 === 0 && i + 1 < str.length) {
          result += ",";
        }
      }
    }
    return result;
  },
  
  /*
   * 计算字符所占字节数，超过60字节数换行
   * */
  strWrapLine(str) {
    return str
      .replace(/[^\x00-\xff]/g, "$&\x01")
      .replace(/.{60}\x01?/g, "$&\n")
      .replace(/\x01/g, "");
  },

  /*
   * 格式化金钱相关的数据
   * @s 为传入的字符串, @dot 为金额每隔三位用哪种分隔符分隔, 默认 ','
   * */
  formatMoney(number, decimals, thousandsSplit, roundModel) {
    /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * thousandsSplit：千分位符号
   * roundModel: 舍入模式，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
   * */
    if (!number && number !== 0) {
      return null
    }
    number = number.toString().replace(/[^0-9+-Ee.]/g, '');
    roundModel = roundModel || "ceil"; //"ceil","floor","round"
    const n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousandsSplit === 'undefined') ? ',' : thousandsSplit;
    let s = '',
      toFixedFix = function (n, prec) {
        const k = Math.pow(10, prec);
        return '' + parseFloat(Math[roundModel](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
      };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join('.');
  },

  getCookie(sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },

  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
};
