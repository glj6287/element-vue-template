var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //  BASE_API: '"http://172.21.0.5:9190"'
   BASE_API: '"http://172.21.0.5:8480"'
  //  BASE_API: '"http://172.17.0.81:8081"'
   //   BASE_API: '"http://139.196.190.171:9090"'
   //   BASE_API: '"http://106.15.60.123:7070"'
  // BASE_API: '"https://easy-mock.com/mock/5a0273ad6be3e9439ddf89b9/example"',
})
