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
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { GetHomeData } from "@/request/api";
export default {
  name: "Home",
  data() {
    return {
      SearchVal: "",
      banner: [],
    };
  },
  created() {
    GetHomeData()
      .then((res) => {
        //banner是轮播图API
        //console.log(res);
        let banner = res.data.banner;
        this.banner = banner;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="less" scoped>
.my-swipe {
  img {
    width: 100%;
  }
}
</style>
