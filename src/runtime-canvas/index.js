
import { createRenderer } from "vue";

/* 基于 canvas平台的 pixi.js库 */
import { Container, Sprite, Texture, Text } from "pixi.js";

/* 自定义渲染器  及 渲染接口的实现 */
const renderer = createRenderer({
    createElement(type) {    // 创建 容器 以及 图片
        let element;
        switch (type) {
            case "container":
                element = new Container();
                break;
            case "sprite":
                element = new Sprite();
                break;
        }
        return element;
    },
    insert(el, parent) {
        if (el) {
            parent.addChild(el);
        }
    },
    parentNode(node) {  // 获取当前 node 的父级节点
        return node.parent
    },
    remove(el) {    // 删除元素时调用
        if (el && el.parent) {
            el.parent.removeChild(el);
        }
    },
    patchProp(el, key, prevValue, nextValue) {
        switch(key){
            case "texture":
                el.texture = Texture.from(nextValue);
                break;
            case "onClick":
                el.on("pointertap",nextValue);
                break;
            default:
                el[key] = nextValue;  // el.x el.y ...
                break;
        }
    },
    // 框架运行 必须要的渲染接口
    createText(text){    
        return new Text(text);
    },
    nextSibling() {},
    createComment() {}
});


export function createApp(rootComponent) {
    return renderer.createApp(rootComponent)
}