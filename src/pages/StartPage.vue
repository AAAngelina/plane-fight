<template>
  <container>
    <sprite :texture="StartPagePath" />
    <sprite
      :texture="StartBtn"
      x="228"
      y="518"
      :interactive="true"
      @click="handleStart"
    />
  </container>
</template>

<script>
import StartPagePath from "../assets/start_page.jpg";
import StartBtn from "../assets/startBtn.png";

export default {
  setup(props, { emit }) {

    function handleStart() {
      emit("change-page", "GamePage");  // 触发 change-page函数，参数 GamePage
    }

    return {
      StartPagePath,
      StartBtn,
      handleStart,
    };
  },
};
</script>

<style>
</style>