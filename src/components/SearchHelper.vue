<template>
  <div class="searchhelper">
    <van-list :finished="finished">
      <van-cell
        v-for="(item, index) in SearchHelperArr.slice(0, 3)"
        :key="index"
        :title="item"
        @click="searchHelperbtn(item)"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  props: ["SearchHelperArr"],
  data() {
    return {
      finished: true,
    };
  },
  methods: {
    searchHelperbtn(val) {
      this.$emit("searchHelperbtn", val);
    },
  },
};
</script>

<style lang="less" scoped>
.searchhelper {
  background-color: #fff;
}
</style>
