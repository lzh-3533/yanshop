//拦截器
import axios from "axios";

//创建一个实例
const instance = axios.create({
  baseURL: "http://kumanxuan1.f3322.net:8001",
  timeout: 5000,
});
// 请求拦截器
// 请求头携带token
instance.interceptors.request.use(
  //config可以携带token
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      // ['X-Nideshop-Token']查看后台数据API 如果是简单的单词就 .XXXX
      config.headers["X-Nideshop-Token"] = token;
    }
    //拦截后需要将拦截下来的请求数据返回发送
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 相应拦截器
instance.interceptors.response.use(
  (res) => {
    // 拦截后需要将拦截下来处理成的结果返回
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
