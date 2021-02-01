<template>
  <container>
    <Map />
    <Plane :x="planePosition.x" :y="planePosition.y" />
    <EnemyPlane
      v-for="(enemy, index) in enemyPlanes"
      :key="index"
      :x="enemy.x"
      :y="enemy.y"
    />
    <Bullet
      v-for="(bullet, index) in bullets"
      :key="index"
      :x="bullet.x"
      :y="bullet.y"
    />
    <Score />
  </container>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import { game } from "../game";
import { collisionDetect } from "../utils";

import Map from "../components/Map";
import Plane, { usePlane } from "../components/Plane";
import EnemyPlane, { useEnemyPlane } from "../components/EnemyPlane";
import Bullet, { useBullet } from "../components/Bullet";

import Score, { useScore } from "../components/Score";

export default {
  components: {
    Map,
    Plane,
    EnemyPlane,
    Bullet,
    Score,
  },

  setup(props, { emit }) {
    let { bullets, addBullet } = useBullet();
    let { enemyPlanes } = useEnemyPlane();

    let { planePosition } = usePlane({
      //传入回调函数
      /* onAttack: addBullet, 默认传入参数 */
      onAttack(planePosition) {
        addBullet(planePosition);
      },
    });

    let { score } = useScore();

    const gameOver = () => emit("change-page", "EndPage");
    /* 碰撞检测 */
    hitDetect({
      planePosition,
      enemyPlanes,
      bullets,
      gameOver,
      score,
    });

    return {
      planePosition,
      enemyPlanes,
      bullets,
      score,
    };
  },
};

function hitDetect({
  planePosition: plane,
  enemyPlanes,
  bullets,
  gameOver,
  score,
}) {
  const handleTicker = () => {
    enemyPlanes.forEach((enemy, i) => {
      /* 飞机 与 敌军 的撞击 */
      if (collisionDetect(enemy, plane)) {
        gameOver();
      }

      /* 子弹 与 敌军 的撞击*/
      bullets.forEach((bullet, j) => {
        if (collisionDetect(enemy, bullet)) {
          bullets.splice(j, 1);
          enemyPlanes.splice(i, 1);
          score.value += 1;
        }
      });
    });
  };

  onMounted(() => {
    game.ticker.add(handleTicker);
  });
  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });
}
</script>

<style>
</style>