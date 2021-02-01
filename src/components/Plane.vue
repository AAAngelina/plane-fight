<template>
  <container>
    <!-- 属性穿透，没被 props接收的属性保存在$attrs上，挂在了根元素container上-->
    <sprite :texture="PlaneImg" />
  </container>
</template>

<script>
import { reactive, onMounted, onUnmounted } from "vue";

import PlaneImg from "../assets/plane.png";

export default {
  setup() {
    return {
      PlaneImg,
    };
  },
};

/* 控制飞机移动：函数抽离，单一职责 */
function move(planePosition) {
  const speed = 10;
  const handleKeydown = (e) => {
    switch (e.code) {
      case "ArrowUp":
        planePosition.y -= speed;
        break;
      case "ArrowDown":
        planePosition.y += speed;
        break;
      case "ArrowLeft":
        planePosition.x -= speed;
        break;
      case "ArrowRight":
        planePosition.x += speed;
        break;
    }
  };
  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
}

/* 攻击: 空格 */
function attack(onAttack, planePosition) {
  const handleKeyup = (e) => {
    if (e.code === "Space") {
        onAttack(planePosition);
    }
  };

  onMounted(() => {
    window.addEventListener("keyup", handleKeyup);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", handleKeyup);
  });
}

export function usePlane(options) {
  let planePosition = reactive({
    // reactive包裹响应式对象
    x: 228,
    y: 700,
    width: 258,
    height: 364
  });

  move(planePosition);

  if (options.onAttack) attack(options.onAttack, planePosition);

  return {
    planePosition,
  };
}
</script>

<style>
</style>