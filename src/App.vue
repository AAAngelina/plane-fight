<template>
  <container>
    <!-- <start-page @change-page='handleChangePage'/>
    <game-page /> -->
    <currentComponent @change-page="handleChangePage" />
  </container>
</template>

<script>
import { computed, ref } from "vue";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import EndPage from "./pages/EndPage";

export default {
  name: "App",
  components: {},

  setup() {
    let currentPage = ref("StartPage"); // 包裹为 响应式数据
    function handleChangePage(page) {
      currentPage.value = page;
    }

    const currentComponent = computed(() => {
      // 计算属性,依赖 currentPage;返回相应的页面组件
      if (currentPage.value === "StartPage") {
        return StartPage;
      } else if (currentPage.value === "GamePage") {
        return GamePage;
      }
      return EndPage;
    });

    return {
      handleChangePage,
      currentComponent,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
