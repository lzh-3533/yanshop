import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
//修复router版本的bug
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { tabbarnum: 0, tabbarshow: true },
    children: [
      {
        path: "searchpopup",
        name: "SearchPopup",
        component: () =>
          import(
            /* webpackChunkName: "SearchPopup" */ "../views/SearchPopup.vue"
          ),
      },
    ],
  },
  {
    path: "/topic",
    name: "Topic",
    meta: { tabbarnum: 1, tabbarshow: true },
    component: () =>
      import(/* webpackChunkName: "Topic" */ "../views/Topic.vue"),
  },
  {
    path: "/category",
    name: "Category",
    meta: { tabbarnum: 2, tabbarshow: true },
    component: () =>
      import(/* webpackChunkName: "Category" */ "../views/Category.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    meta: { tabbarnum: 3, tabbarshow: true },
    component: () => import(/* webpackChunkName: "Cart" */ "../views/Cart.vue"),
  },
  {
    path: "/user",
    name: "User",
    meta: { tabbarnum: 4, tabbarshow: true },
    component: () => import(/* webpackChunkName: "User" */ "../views/User.vue"),
  },
  {
    path: "/productdetail",
    name: "ProductDetail",
    component: () =>
      import(
        /* webpackChunkName: "GoodsDetail" */ "../views/ProductDetail.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});
// 路由拦截
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.path == "/cart") {
    if (token) {
      next();
    } else {
      Vue.prototype.$toast("请先登录");
      setTimeout(() => {
        next("/user");
      }, 500);
    }
  }
  next();
});

export default router;
