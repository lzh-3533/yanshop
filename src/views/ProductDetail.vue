<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" width="100%" alt="" />
      </van-swipe-item>
    </van-swipe>
    <Tips />
    <!-- 标题价格 -->
    <div class="info">
      <div class="title_name">{{ info.name }}</div>
      <div class="goods_brief">{{ info.goods_brief }}</div>
      <div class="retail_price">{{ info.retail_price | filterMoney }}</div>
    </div>
    <!-- 弹出层 -->
    <van-cell title="展示弹出层" is-link />

    <!-- 商品参数 -->
    <div class="attribute_box">
      <div class="attribute_title">
        商品参数
      </div>
      <ul>
        <li v-for="(item, index) in attribute" :key="index">
          <span class="name">{{ item.name }}</span>
          <span class="value van-ellipsis">{{ item.value }}</span>
        </li>
      </ul>
    </div>
    <!-- 图片详情 -->
    <div v-html="info.goods_desc" class="goods_desc"></div>
    <!-- 常见问题 -->
    <div class="last_title">
      <span>常见问题</span>
    </div>
    <div class="question" v-for="item in issue" :key="item.id">
      <div>{{ item.question }}</div>
      <p>{{ item.answer }}</p>
    </div>
    <div class="last_title">
      <span>大家都在看</span>
    </div>
    <Product :goodsList="goodsList" />
    <van-sku
      v-model="isSkuShow"
      ref="sku"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    >
    </van-sku>
    <AppGoodsAction @openSku="openSku" :goodsCount="goodsCount" />
  </div>
</template>

<script>
import Product from "@/components/Product";
import {
  Getgoodsdetail,
  Getgoodsrelated,
  GetCartNum,
  GetCartAdd,
} from "@/request/api.js";
import Tips from "@/components/Tips";
import AppGoodsAction from "@/components/AppGoodsAction";

export default {
  components: { Tips, Product, AppGoodsAction },
  data() {
    return {
      isSkuShow: false,

      // 购物车图标数量
      goodsCount: "",
      productList: [],

      sku: {
        tree: [],
        price: "",
        stock_num: 0,
      },
      goods: {
        picture: "",
      },
      goodsId: "",

      // 轮播图
      gallery: [],
      // 产品信息
      info: {
        name: "",
        goods_brief: "",
        retail_price: "",
        goods_desc: "",
      },
      // 产品参数
      attribute: [],
      issue: [],
      goodsList: [],
    };
  },
  created() {
    this.GetcartNum();

    Getgoodsdetail({
      id: this.$route.query.id,
    }).then((res) => {
      if (res.errno == 0) {
        //console.log(res);
        // 轮播图
        this.gallery = res.data.gallery;
        // 产品信息
        this.info = res.data.info;
        // 产品参数
        this.attribute = res.data.attribute;
        this.issue = res.data.issue;
        this.productList = res.data.productList;
        this.goods.picture = res.data.info.list_pic_url;
        this.sku.stock_num = res.data.info.goods_number;
        this.sku.price = res.data.info.retail_price;
        this.goodsId = this.$route.query.id;
      }
    });
    // 相关产品
    Getgoodsrelated({
      id: this.$route.query.id,
    }).then((res) => {
      if (res.errno == 0) {
        this.goodsList = res.data.goodsList;
      }
    });
  },
  methods: {
    //// 获取购物车图标数量
    GetcartNum() {
      GetCartNum().then((res) => {
        console.log(res);
        if (res.errno == 0) {
          this.goodsCount = res.data.cartTotal.goodsCount;
        }
      });
    },

    openSku() {
      this.isSkuShow = true;
    },
    // SKU立即购买
    onBuyClicked() {
      this.onAddCartClicked();
      this.$router.push("/cart");
    },
    // SKU加入购物车
    onAddCartClicked() {
      let token = localStorage.getItem("token");
      if (token) {
        GetCartAdd({
          goodsId: this.$route.query.id,
          number: this.$refs.sku.getSkuData().selectedNum,
          productId: this.productList[0].id,
        }).then((res) => {
          //console.log(res);
          if (res.errno == 0) {
            this.goodsGount = res.data.cartTotal.goodsCount;
            this.GetcartNum();
            this.$toast.success("添加成功");
            setTimeout(() => {
              this.isSkuShow = false;
            }, 2000);
          }
        });
      } else {
        this.$toast("请先登录");
        this.$router.push("/user");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.info {
  background-color: #fff;
  border-bottom: 1px solid #999;
  .title_name {
    font-size: 0.2rem;
    line-height: 0.4rem;
    color: #000;
    text-align: center;
  }
  .goods_brief {
    line-height: 0.4rem;
    font-size: 0.16rem;
    color: #000;
    text-align: center;
  }
  .retail_price {
    line-height: 0.4rem;
    font-size: 0.16rem;
    color: red;
    text-align: center;
  }
}
.attribute_box {
  background-color: #fff;
  margin-top: 0.15rem;
  padding: 4% 4%;
  .attribute_title {
    padding-top: 1%;
    color: #000;
  }
  ul {
    li {
      display: flex;
      background-color: #f1f1f1;
      margin-top: 0.1rem;
      line-height: 0.3rem;
      .name {
        width: 20%;
        text-align: right;
        font-size: 0.12rem;
      }
      .value {
        flex: 1;
        color: #000;
        margin-left: 0.1rem;
        font-size: 0.14rem;
      }
    }
  }
}
// 深度写样式的方法
/deep/.goods_desc {
  img {
    width: 100%;
  }
}
.last_title {
  width: 100%;
  position: relative;
  margin-top: 0.2rem;
  line-height: 0.5rem;
  text-align: center;
  background-color: #fff;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #000;
    width: 50%;
    height: 2px;
    margin-left: -25%;
  }
  span {
    position: relative;
    width: 30%;
    z-index: 2;
    background-color: #fff;
    display: block;
    text-align: center;
    margin: 0 auto;
  }
}
.question {
  background-color: #fff;
  padding: 0 4%;
  padding-bottom: 4%;
  div {
    position: relative;
    line-height: 0.4rem;
    color: #000;
    padding-left: 0.2rem;
    &::before {
      content: "";
      background-color: red;
      width: 4px;
      height: 4px;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -0.02rem;
    }
  }
  p {
    font-size: 0.13rem;
  }
}
</style>
