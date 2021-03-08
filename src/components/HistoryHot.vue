<template>
  <div class="historyhot">
    <!-- 历史记录 -->
    <div class="history">
      <div class="history_hd">
        <h4>历史记录</h4>
        <van-icon name="delete-o" />
      </div>
      <div class="history_bd">
        <van-tag
          type="default"
          plain
          v-for="(item, index) in historyKeywordList"
          :key="index"
          @click="historyTag(item)"
          >{{ item }}</van-tag
        >
      </div>
    </div>

    <div class="hot">
      <div class="hot_hd">
        <h4>热门搜索</h4>
      </div>
      <div class="hot_bd">
        <van-tag
          :type="item.is_hot == 1 ? 'danger' : 'default'"
          plain
          v-for="(item, index) in hotKeywordList"
          :key="index"
          @click="hotTag(item.keyword)"
          >{{ item.keyword }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["historyKeywordList", "hotKeywordList"],
  data() {
    return {};
  },
  methods: {
    historyTag(val) {
      this.$emit("historyTag", val);
    },
    hotTag(val) {
      this.$emit("hotTag", val);
    },
  },
};
</script>

<style lang="less" scoped>
.historyhot {
  height: 100%;
  width: 100%;
  background-color: #efefef;
}
.history {
  background-color: #fff;
  padding: 2%;
  color: #666;
  .history_hd {
    display: flex;
    justify-content: space-between;
    h4 {
      font-weight: normal;
      font-size: 0.19rem;
    }
  }
  .history_bd {
    .van-tag {
      padding: 0.03rem;
      margin-right: 0.08rem;
      margin-top: 0.08rem;
    }
  }
}
.hot {
  margin-top: 0.2rem;
  background-color: #fff;
  padding: 2%;
  color: #666;
  .hot_hd {
    h4 {
      font-weight: normal;
      font-size: 0.19rem;
    }
  }
  .hot_bd {
    .van-tag {
      padding: 0.03rem;
      margin-right: 0.08rem;
      margin-top: 0.08rem;
    }
  }
}
</style>
