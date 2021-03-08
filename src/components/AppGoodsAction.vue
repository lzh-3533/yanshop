<template>
  <van-goods-action>
    <van-goods-action-icon icon="star-o" text="已收藏" />
    <van-goods-action-icon
      icon="cart-o"
      text="购物车"
      @click="$router.push('/cart')"
      :badge="goodsCount"
    />
    <van-goods-action-button
      type="warning"
      text="加入购物车"
      @click="openSku"
    />
    <van-goods-action-button type="danger" text="立即购买" @click="openSku" />
  </van-goods-action>
</template>

<script>
export default {
  props: ["goodsCount"],
  data() {
    return {};
  },
  methods: {
    openSku() {
      this.$emit("openSku");
    },
  },
};
</script>

<style></style>
