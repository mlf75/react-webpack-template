/**
 * @author      mlf
 * @date        2020-07-17
 * @description
 */
import {EventEmitter} from 'events'    //引入events事件
const bus={...EventEmitter.prototype}   //将events事件原型链，拓展到bus上
export default bus