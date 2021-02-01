<template>
  <container>
    <sprite :texture="enemyPlane" />
  </container>
</template>

<script>
import { reactive, onMounted, onUnmounted } from "vue";

import { game } from "../game";

import enemyPlane from "../assets/enemy.png";

export default {
  setup() {
    return {
      enemyPlane,
    };
  },
};

function move(enemyPlanes) {
  const speed = 2;
  const handleTicker = () => {
    enemyPlanes.forEach((enemy, index) => {
      enemy.y += speed;
      if (enemy.y >= 1000) {
        enemyPlanes.splice(index, 1); // 移除
      }
    });
  };
  onMounted(() => {
    game.ticker.add(handleTicker);
  });
  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });
}

function addEnemy(enemyPlanes) {
  let timerId = -1;
  const y = 50;

  const timerHandler = () => {
    let x = Math.floor(Math.random() * 500);
    enemyPlanes.push({
        x,
        y,
        width: 308,
        height: 207
    })
  };

  onMounted(() => {
    timerId = setInterval(timerHandler, 1200);
  });
  onUnmounted(() => {
    clearInterval(timerId);
  });
}

export function useEnemyPlane() {
  let enemyPlanes = reactive([]);

  /* 随机生成 敌军飞机 */
  addEnemy(enemyPlanes);

  /* 处理敌军移动 */
  move(enemyPlanes);

  return {
    enemyPlanes,
  };
}
</script>

<style>
</style>