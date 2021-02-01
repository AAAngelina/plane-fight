<template>
  <container> 得分：{{ score }} </container>
</template>

<script>
import { ref } from "vue";

let score = ref(0);

export default {
  setup() {
    return {
      score,
    };
  },
};

export function useScore() {
  return {
    score,
  };
}
</script>

<style>
</style>