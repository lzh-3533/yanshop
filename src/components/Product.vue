<template>
  <div class="product">
    <ul>
      <li
        v-for="item in goodsList"
        :key="item.id"
        @click="productDetail(item.id)"
      >
        <img :src="item.list_pic_url" alt="" />
        <p class="van-ellipsis">{{ item.name }}</p>
        <div>{{ item.retail_price | filterMoney }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["goodsList"],
  data() {
    return {};
  },
  methods: {
    productDetail(id) {
      this.$router.push("/productdetail?id=" + id);
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 2%;
  li {
    width: 49%;
    margin-top: 0.1rem;
    background-color: #fff;
    img {
      width: 100%;
    }
    p {
      font-size: 0.16rem;
      padding: 0.03rem;
      text-align: center;
    }
    div {
      padding: 0.03rem;
      text-align: center;
      color: red;
    }
  }
}
</style>
