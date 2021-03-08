<template>
  <div id="app">
    <Mytabbar v-if="$route.meta.tabbarshow" />
    <router-view />
  </div>
</template>
<script>
import Mytabbar from "@/components/Mytabbar.vue";
export default {
  components: { Mytabbar },
  data() {
    return {};
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
