<template>
  <container>
    <sprite :texture="EndPagePath" />
    <sprite
      :texture="ReStartBtn"
      x="228"
      y="518"
      :interactive="true"
      @click="handleStart"
    />
  </container>
</template>

<script>
import EndPagePath from "../assets/end_page.jpg";
import ReStartBtn from "../assets/restartBtn.png";

export default {
  setup(props, { emit }) {

    function handleStart() {
      emit("change-page", "GamePage");  // 触发 change-page函数，参数 GamePage
    }

    return {
      EndPagePath,
      ReStartBtn,
      handleStart,
    };
  },
};
</script>

<style>
</style>