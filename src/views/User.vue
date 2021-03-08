<template>
  <div>
    <!-- 登录 -->
    <van-row @click="isshow">
      <van-col span="6"><img :src="avatar" alt=""/></van-col>
      <van-col span="17"
        ><span>{{ nickname }}</span></van-col
      >
      <van-col span="1"><van-icon name="arrow"/></van-col>
    </van-row>
    <!-- 宫格 -->
    <van-grid square :column-num="3">
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>

    <transition name="van-fade">
      <!-- 模态框 -->
      <div class="loginmodal" v-show="isshowmodal">
        <!--添加一个关闭的模块框 阻止冒泡的发生  -->
        <div class="closemodal" @click="isshowmodal = !isshowmodal"></div>
        <!-- 登录表单 -->
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { GoLogin } from "@/request/api";

export default {
  data() {
    return {
      isshowmodal: false,
      username: "",
      password: "",
      nickname: "用户登录",
      avatar: require("@/assets/logo.png"),
    };
  },
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      let userInfo = localStorage.getItem("userInfo");
      let newUserInfo = JSON.parse(userInfo);
      this.avatar = newUserInfo.avatar;
      this.nickname = newUserInfo.nickname;
    }
  },
  methods: {
    onSubmit(values) {
      //console.log("submit", values);
      //console.log("user", values["用户名"]);
      //console.log("paw", values["密码"]);
      GoLogin({ username: values["用户名"], pwd: values["密码"] }).then(
        (res) => {
          if (res.errno == 0) {
            console.log(res);
            this.$toast.success("登录成功");
            // 把token值和数据保存到本地存储
            localStorage.setItem("token", res.data.token);
            //userInfo是对象 所以需要这样保存
            localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
            setTimeout(() => {
              this.isshowmodal = false;
              this.nickname = res.data.userInfo.nickname;
              this.avatar = res.data.userInfo.avatar;
            }, 1000);
          }
        }
      );
    },
    isshow() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.isshowmodal = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.van-row {
  padding: 0.2rem 4%;
  background: #333;
  color: #fff;
  .van-col {
    line-height: 0.8rem;
    font-size: 0.2rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      display: block;
    }
  }
}
.loginmodal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  .closemodal {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .van-form {
    position: absolute;
    width: 90%;
    top: 35%;
    left: 50%;
    margin-left: -45%;
    background-color: #fff;
    padding: 3% 0;
  }
}
</style>
