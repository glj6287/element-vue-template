/**
 * 公共工具类
 */
 import { Message } from 'element-ui'

 var Utils = {
   info: function(text){
     Message({
       message: text,
       type: 'info',
       duration: 4 * 1000
     })
   },
   error: function(text){
     Message({
       message: text ,
       type: 'error',
       duration: 4 * 1000
     })
   },
   success: function(text){
     Message({
       message: text ,
       type: 'success',
       duration: 4 * 1000
     })
   },
   warning: function(text){
     Message({
       message: text ,
       type: 'warning',
       duration: 4 * 1000
     })
   },
   isNotEmpty: function(obj) {
     return obj !== undefined && obj !== null && obj !== ""
   }
 }

 export default Utils
