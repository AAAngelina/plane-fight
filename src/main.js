import { createApp } from './runtime-canvas';

import App from "./App.vue";
import { getRootContainer } from "./game";

console.warn = () => { }   // 屏蔽原生的 warn

//APP 根组件，game.stage 基于 canvas 的根容器
createApp(App).mount(getRootContainer());
