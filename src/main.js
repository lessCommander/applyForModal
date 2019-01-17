// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>'
});

/* 自定义封装的简单ajax，只用于模拟GET请求，提交模板使用 */
Vue.prototype.ajax = function (option) {
  let {
      type,
      url,
      dataType,
      successFn,
      errorFn
  } = option;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      let res = '';
      if (xhr.readyState == 4) {
          if (xhr.status == 200) {
              res = xhr.responseText;
              successFn(res);
          } else {
              res = xhr.error;
              errorFn(res)
          }
      }
  };
  xhr.open(type, url, true);
  xhr.send(null);
};