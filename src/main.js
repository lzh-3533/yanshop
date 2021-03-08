import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/base.css";
import "./vantui";

Vue.config.productionTip = false;

Vue.filter("filterMoney", function(val) {
  let newVal = Number(val);
  return "￥ " + newVal.toFixed(2) + " 元";
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
