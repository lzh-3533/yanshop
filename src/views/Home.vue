<template>
  <div class="home">
    <!-- 搜索框 -->
    <van-search
      v-model="SearchVal"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
      @click="$router.push('/home/searchpopup')"
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格栏 -->
    <van-grid :column-num="5" :border="false">
      <van-grid-item
        v-for="item in channel"
        :key="item.id"
        :icon="item.icon_url"
        :text="item.name"
      />
      <!-- :to="item.url" 待完善-->
    </van-grid>
    <!-- title -->
    <div class="title">品牌制造商直供</div>
    <ul class="brandlist">
      <li v-for="item in brandList" :key="item.id">
        <img :src="item.pic_url" alt="" />
        <div class="brand-name">{{ item.name }}</div>
        <div class="brand-price">{{ item.floor_price | filterMoney }}</div>
      </li>
    </ul>
    <div class="title">周一到周四 新品首发</div>
    <!-- 新品首发 -->
    <Product :goodsList="newGoodsList" />

    <div class="title">热门商品</div>
    <Product :goodsList="hotGoodsList" />

    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Product from "@/components/Product";
import { GetHomeData } from "@/request/api";
export default {
  components: { Product },
  name: "Home",
  data() {
    return {
      SearchVal: "",
      banner: [],
      channel: [],
      brandList: [],
      // 新品展示
      newGoodsList: [],
      hotGoodsList: [],
    };
  },
  created() {
    GetHomeData().then((res) => {
      //banner是轮播图API
      console.log(res);
      this.channel = res.data.channel;
      this.banner = res.data.banner;
      // 品牌详情
      this.brandList = res.data.brandList;
      this.newGoodsList = res.data.newGoodsList;
      this.hotGoodsList = res.data.hotGoodsList;
    });
  },
};
</script>
<style lang="less" scoped>
.home {
  margin-bottom: 0.7rem;
}
.my-swipe {
  img {
    width: 100%;
  }
}
.title {
  margin-top: 0.2rem;
  line-height: 0.5rem;
  background-color: #fff;
  text-align: center;
}
.brandlist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #fff;
  li {
    margin-top: 0.08rem;
    width: 49%;
    position: relative;
    img {
      width: 100%;
    }
    .brand-name {
      position: absolute;
      left: 6%;
      top: 0;
      line-height: 0.4rem;
    }
    .brand-price {
      position: absolute;
      left: 6%;
      top: 0.4rem;
      color: darkred;
    }
  }
}
</style>
