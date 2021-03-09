<template>
  <div class="topic">
    <div class="list" v-for="item in topicList" :key="item.id">
      <img :src="item.scene_pic_url" alt="" />
      <div class="list-title">{{ item.title }}</div>
      <p class="subtitle">{{ item.subtitle }}</p>
      <div class="price">{{ item.price_info | filterMoney }}起</div>
    </div>
  </div>
</template>

<script>
import { GrtTopicList } from "@/request/api";

export default {
  data() {
    return {
      page: 1,
      size: 10,
      topicList: [],
    };
  },
  created() {
    GrtTopicList({
      page: this.page,
      size: this.size,
    }).then((res) => {
      console.log(res);
      if (res.errno == 0) {
        this.topicList = res.data.data;
      }
    });
  },
};
</script>
<style lang="less" scoped>
.list {
  margin-bottom: 0.3rem;
  background-color: #fff;
  text-align: center;
  line-height: 0.4rem;
  img {
    width: 100%;
  }
}
</style>
