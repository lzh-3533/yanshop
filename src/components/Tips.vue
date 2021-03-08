<template>
  <div>
    <van-row>
      <van-col span="8"
        ><van-icon name="checked" color="#7E0A18" />30天无忧退货</van-col
      >
      <van-col span="8"
        ><van-icon name="checked" color="#7E0A18" />48小时快速退费</van-col
      >
      <van-col span="8"
        ><van-icon name="checked" color="#7E0A18" />满88元免邮费</van-col
      >
    </van-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.van-col {
  font-size: 0.13rem;
  color: #000;
  line-height: 0.3rem;
  text-align: center;
  .van-icon {
    margin-top: 0.02rem;
    transform: translate(-0.02rem, 0.02rem);
  }
}
</style>
