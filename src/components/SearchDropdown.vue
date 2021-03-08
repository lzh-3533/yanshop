<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item disabled title="综合" />
      <van-dropdown-item
        title="价格"
        v-model="priceval"
        :options="pricearr"
        @change="PriceChange"
      />
      <van-dropdown-item
        title="分类"
        v-model="CategoryVal"
        :options="filterCategory"
        @change="CategoryChange"
      />
    </van-dropdown-menu>
    <van-empty
      v-if="goodsList.length == 0"
      image="search"
      description="你输入的产品不存在"
    />
    <Product :goodsList="goodsList" />
  </div>
</template>

<script>
import Product from "@/components/Product";
export default {
  components: { Product },
  props: ["filterCategory", "goodsList"],
  data() {
    return {
      priceval: "",
      CategoryVal: "",
      pricearr: [
        { text: "价格由高到低", value: "desc" },
        { text: "价格由低到高", value: "asc" },
      ],
    };
  },

  beforeUpdate() {
    this.filterCategory.map((item) => {
      if ((item.checked = true)) {
        // console.log(item);
        this.CategoryVal = item.value;
        return;
      }
    });
  },

  methods: {
    CategoryChange(value) {
      this.$emit("CategoryChange", value);
    },
    PriceChange(value) {
      console.log(value);
      this.$emit("PriceChange", value);
    },
  },
};
</script>

<style></style>
