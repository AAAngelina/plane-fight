<template>
  <container>
    <sprite :texture="mapPath" :y="mapY1" />
    <sprite :texture="mapPath" :y="mapY2" />
  </container>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

import mapPath from "../assets/map.jpg";
import { game } from "../game";

export default {
  setup() {
    const { mapY1, mapY2 } = useMove();
    return {
      mapPath,
      mapY1,
      mapY2,
    };
  },
};

function useMove() {
  const gameHeight = 1080;
  const speed = 10;

  let mapY1 = ref(0);     // 包装响应式数据
  let mapY2 = ref(-gameHeight);

  const handleTicker = () => {
    // 改变 map 的坐标，使之不断移动
    mapY1.value += speed;
    mapY2.value += speed;
    if (mapY1.value >= gameHeight) {
      mapY1.value = -gameHeight;
    }
    if (mapY2.value >= gameHeight) {
      mapY2.value = -gameHeight;
    }
  };

  onMounted(() => {
    game.ticker.add(handleTicker); //添加帧循环
  });
  onUnmounted(() => {
    game.ticker.remove(handleTicker); //移除帧循环
  });

  return {
    mapY1,
    mapY2,
  };
}
</script>

<style>
</style>