import request from "./request";

//get请求 没有携带参数的
//首页请求
export const GetHomeData = () => request.get("index/index");
//搜索窗口
export const GetSearchData = () => request.get("/search/index");
//实时搜索功能
export const GetSearchHelper = (params) =>
  request.get("/search/helper", { params });
//商品列表
export const GetProductData = (params) =>
  request.get("/goods/list", { params });

// 获取登录接口
export const GoLogin = (params) => request.post("/auth/loginByWeb", params);

//获取产品详情气信息
export const Getgoodsdetail = (params) =>
  request.get("/goods/detail", { params });
//相关产品
export const Getgoodsrelated = (params) =>
  request.get("/goods/related", { params });

//获取购物车产品数量
export const GetCartNum = () => request.get("/cart/goodscount");
//加入购物车
export const GetCartAdd = (params) => request.post("/cart/add", params);
//购物车数据
export const GetCartIndex = () => request.get("/cart/index");
//切换商品选中状态（含全选）
export const GetCartChecked = (params) => request.post("/cart/checked", params);

// 步进器
export const GetCartupdate = (params) => request.post("/cart/update", params);

///cart/delete
// 购物车删除商品
export const GetCartDelete = (params) => request.post("/cart/delete", params);
