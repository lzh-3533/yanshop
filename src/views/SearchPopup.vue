<template>
  <div class="searchpopup">
    <!-- 搜索框 -->
    <van-search
      v-model="Searchvalue"
      show-action
      :placeholder="keyword"
      @input="SearchTips"
      @cancel="CancelSearch"
      @search="SearchGoodsList"
    />
    <HistoryHot
      :historyKeywordList="historyKeywordList"
      :hotKeywordList="hotKeywordList"
      v-if="blockshow == 1"
      @historyTag="historyTag"
      @hotTag="hotTag"
    />
    <SearchHelper
      :SearchHelperArr="SearchHelperArr"
      v-else-if="blockshow == 2"
      @searchHelperbtn="searchHelperbtn"
    />
    <!-- 子组件传过来的自定义事件 @CategoryChange名称， 后面的就父组件调用的方法CategoryChange -->
    <SearchDropdown
      v-else
      :filterCategory="filterCategory"
      :goodsList="goodsList"
      @CategoryChange="CategoryChange"
      @PriceChange="PriceChange"
    />
  </div>
</template>

<script>
import HistoryHot from "@/components/HistoryHot";
import SearchHelper from "@/components/SearchHelper";
import SearchDropdown from "@/components/SearchDropdown";
import { GetSearchData, GetSearchHelper, GetProductData } from "@/request/api";

export default {
  name: "SearchPopup",
  components: { HistoryHot, SearchHelper, SearchDropdown },
  data() {
    return {
      //输入框内容
      Searchvalue: "",
      //热门数组
      hotKeywordList: [],
      //历史记录
      historyKeywordList: [],

      blockshow: 3,

      keyword: "",
      // 搜索特使
      SearchHelperArr: [],
      //产品列表
      goodsList: [],
      //分类列表
      filterCategory: [],
      order: "desc",
      categoryId: 0,
      sort: "id",
    };
  },
  created() {
    // 历史几率和热门
    this.blockshow = 1;
    GetSearchData()
      .then((res) => {
        if (res.errno == 0) {
          // console.log(res);
          this.keyword = res.data.defaultKeyword.keyword;
          this.historyKeywordList = res.data.historyKeywordList;
          this.hotKeywordList = res.data.hotKeywordList;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    searchHelperbtn(val) {
      this.Searchvalue = val;
      this.SearchGoodsList(val);
    },
    historyTag(val) {
      //先改不搜索框的值，不然会价格排序的话会出现bug
      this.Searchvalue = val;
      this.SearchGoodsList(val);
    },
    hotTag(val) {
      this.Searchvalue = val;
      this.SearchGoodsList(val);
    },

    PriceChange(value) {
      this.order = value;
      this.sort = "price";
      //发送搜索商品请求
      this.SearchGoodsList(this.Searchvalue);
    },

    // 分类点击是切换通过子组件传递过来的
    CategoryChange(value) {
      this.categoryId = value;
      //发送搜索商品请求
      this.SearchGoodsList(this.Searchvalue);
    },

    // 搜索提示框
    SearchTips() {
      this.blockshow = 2;
      //console.log("123");
      GetSearchHelper({
        keyword: this.Searchvalue,
      })
        .then((res) => {
          // console.log(res);
          if (res.errno == 0) {
            this.SearchHelperArr = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 搜索产品列表
    SearchGoodsList(val) {
      this.blockshow = 3;
      GetProductData({
        keyword: val,
        page: 1,
        size: 20,
        order: this.order,
        categoryId: this.categoryId,
        sort: this.sort,
      }).then((res) => {
        if (res.errno == 0) {
          console.log(res);
          let { goodsList, filterCategory } = res.data;
          // 下拉菜单的值 只能是text和value。我们利用深拷贝，来重新给分类标签赋值
          let arr = JSON.parse(
            JSON.stringify(filterCategory)
              .replace(/name/g, "text")
              .replace(/id/g, "value")
          );
          this.goodsList = goodsList;
          this.filterCategory = arr;
        }
      });
    },

    CancelSearch() {
      this.$router.go(-1);
    },

    //  GetSearchHelper({ keyword:this.keyword })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>

<style lang="less" scoped>
.searchpopup {
  width: 100%;
  height: 100%;
  background-color: #efefef;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
