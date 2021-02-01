<template>
  <container>
    <sprite :texture="BulletImg" />
  </container>
</template>

<script>
import { reactive,onMounted,onUnmounted } from "vue";

import { game } from "../game";

import BulletImg from "../assets/bullet.png";

export default {
  setup() {
    return {
      BulletImg,
    };
  },
};

function move(bullets) {
  const speed = 5;
  const handleTicker = () => {
    bullets.forEach((bullet, index) => {
      bullet.y -= speed;
      if (bullet.y <= 0) {
        bullets.splice(index, 1); // 移除
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

export function useBullet() {
  let bullets = reactive([]);

  const addBullet = (planePosition) => {
      bullets.push({
          x: planePosition.x + 105,
          y: planePosition.y - 50,
          width: 61,
          height: 99
      })
  };

  move(bullets)

  return {
    bullets,
    addBullet,
  };
}
</script>

<style>
</style>