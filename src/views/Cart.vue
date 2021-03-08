<template>
  <div class="cart">
    <Tips />

    <van-checkbox-group v-model="result" :disabled="isclicked">
      <van-checkbox
        :name="item.id"
        v-for="item in cartList"
        :key="item.id"
        @click="checkboxbtn(item)"
      >
        <van-swipe-cell>
          <van-card
            :num="item.number"
            :price="item.retail_price"
            :title="item.goods_name"
            :thumb="item.list_pic_url"
          />
          <template #right>
            <van-button
              class="delbtn"
              square
              type="danger"
              @click="delgoodsbtn(item.product_id)"
              text="删除"
            />
          </template>
        </van-swipe-cell>
        <!-- 步进器 -->
        <van-stepper
          v-show="isclicked"
          v-model="item.number"
          @change="plusNum(item)"
          min="1"
        />
      </van-checkbox>
    </van-checkbox-group>
    <!-- 底部 -->
    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedadd" :disabled="isclicked"
        >全选</van-checkbox
      >
      <template #tip>
        累计完成<span>{{ cartTotal.checkedGoodsCount }}</span
        >件商品，可点击
        <van-button
          :type="isclicked ? 'danger' : 'primary'"
          size="small"
          @click="isclicked = !isclicked"
          >{{ isclicked ? "完成编辑" : "编辑" }}</van-button
        >
        按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Tips from "@/components/Tips";
import {
  GetCartIndex,
  GetCartChecked,
  GetCartupdate,
  GetCartDelete,
} from "@/request/api.js";
export default {
  components: { Tips },
  data() {
    return {
      result: [],
      // 购物车数据
      cartList: [],
      // 购物车的的金额
      cartTotal: {},

      //被点击了 就是true,没有被点击就是fales
      isclicked: false,
    };
  },
  created() {
    GetCartIndex().then((res) => {
      console.log(res);
      if (res.errno == 0) {
        this.totalFn(res.data);
      }
    });
  },

  methods: {
    // 删除产品
    delgoodsbtn(product_id) {
      GetCartDelete({
        productIds: product_id.toString(),
      }).then((res) => {
        if (res.errno == 0) {
          this.totalFn(res.data);
        }
      });
    },

    totalFn(data) {
      this.cartList = data.cartList;
      this.cartTotal = data.cartTotal;
      this.result = [];
      this.cartList.map((val) => {
        if (val.checked == 1) {
          this.result.push(val.id);
        }
      });
    },

    plusNum(item) {
      event.stopPropagation(); // 阻止事件冒泡
      GetCartupdate({
        number: item.number,
        goodsId: item.goods_id,
        id: item.id,
        productId: item.product_id,
      }).then((res) => {
        this.totalFn(res.data);
      });
    },

    // 商品步进器

    // 卡片点击
    checkboxbtn(item) {
      if (this.isclicked) {
        return;
      } else {
        GetCartChecked({
          // 如果checked值是1 变成0 否者就是1  等于取反 01 01 01 01
          isChecked: item.checked == 1 ? 0 : 1,
          productIds: item.product_id.toString(),
        }).then((res) => {
          if (res.errno == 0) {
            this.totalFn(res.data);
          }
        });
      }
    },

    onSubmit() {
      console.log("123");
    },
  },

  computed: {
    checkedadd: {
      get() {
        return this.cartList.length == this.result.length ? true : false;
      },
      set(val) {
        // val 的值是falue 或者是true

        if (this.isclicked) {
          return;
        } else {
          let arrid = [];
          // 遍历此数组，获取到product_id
          this.cartList.map((item) => {
            arrid.push(item.product_id);
          });
          GetCartChecked({
            isChecked: val ? 1 : 0,
            productIds: arrid.join(),
          }).then((res) => {
            if (res.errno == 0) {
              this.totalFn(res.data);
              //console.log(res);
            }
          });
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.van-checkbox-group {
  background-color: #fff;
  /deep/.van-checkbox__label {
    flex: 1;
  }
  /deep/.van-checkbox {
    padding: 0.08rem 0.15rem;
    border-bottom: 1px solid #ccc;
    .van-card__num {
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 0.02rem 0.03rem;
      border-radius: 20%;
    }
  }
  .van-stepper {
    text-align: right;
  }
}
.van-submit-bar {
  margin-bottom: 0.5rem;
}
.delbtn {
  height: 100%;
}
</style>
