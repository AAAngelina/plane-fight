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
    <Score x="340" y="480" />
  </container>
</template>

<script>
import EndPagePath from "../assets/end_page.jpg";
import ReStartBtn from "../assets/restartBtn.png";
import Score, { useScore } from "../components/Score";

export default {
  components: {
    Score,
  },
  setup(props, { emit }) {
    let { score } = useScore();
    function handleStart() {
      score.value = 0;
      emit("change-page", "GamePage"); // 触发 change-page函数，参数 GamePage
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