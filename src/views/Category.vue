<template>
  <div>
    <div class="box">
      <!-- 左侧 -->
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="item in categoryList"
          :key="item.id"
          :title="item.name"
          @click="onclick(item.id)"
        />
      </van-sidebar>
      <!-- 右侧 -->
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { GrtCatalogIndex } from "@/request/api";
export default {
  data() {
    return {
      activeKey: 0,
      categoryList: [],
    };
  },
  created() {
    GrtCatalogIndex().then((res) => {
      console.log(res);
      this.categoryList = res.data.categoryList;
    });
  },
  methods: {
    onclick(id) {
      console.log(id);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
}
.van-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
}

.right {
  right: 0;
  top: 0;
  height: 40px;
  width: 80%;
  background-color: pink;
}
</style>
