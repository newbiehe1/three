
<style>
@import url("./assets/normal.css");
body,
html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.geometry-container {
    position: fixed;
    top: 0;
    bottom: 0;
    margin: auto 0;
    right: 0;
    width: 200px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px 20px;
    ::v-deep {
        .el-radio {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 10px 0;
            input {
                margin-right: 5px;
            }
        }
    }
}
</style>

<template>
    <canvas ref="c" />
    <ElRadioGroup class="geometry-container" v-model="typeVal">
        <ElRadio
            v-for="item in typeList"
            :key="item.key"
            value
            :label="item.key"
            >{{ item.name }}</ElRadio
        >
    </ElRadioGroup>
</template>

<script>
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PointLight,
    AmbientLight,
} from "three";
import { ElRadio, ElRadioGroup } from "element-plus";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ref, onMounted, nextTick, watch, onUnmounted } from "vue";
import { draw } from "./assets/js/entry";
export default {
    components: { ElRadio, ElRadioGroup },
    setup() {
        const c = ref();
        let geometry = null;

        const typeList = [
            {
                name: "正方体、长方体",
                key: "box",
            },
            {
                name: "圆形",
                key: "circle",
            },
            {
                name: "圆锥",
                key: "cone",
            },
            {
                name: "圆柱",
                key: "cylinder",
            },
            {
                name: "12面几何体",
                key: "dodecahedron",
            },
            {
                name: "边缘几何体",
                key: "edges",
            },
            {
                name: "挤压缓冲几何体",
                key: "extrude",
            },
            {
                name: "20面缓冲几何体",
                key: "icosahedron",
            },
        ];
        const typeVal = ref(typeList[0].key);

        const scene = new Scene();

        const point = new PointLight(0xffffff);
        point.position.set(400, 200, 300);
        scene.add(point);

        const ambient = new AmbientLight(0x444444);
        scene.add(ambient);

        const k = window.innerWidth / window.innerHeight;
        const s = 1000;
        const camera = new PerspectiveCamera(s * k, k, 1, 1000);
        camera.position.set(200, 400, 200);
        camera.lookAt(scene.position);

        let renderer = ref();
        onMounted(() => {
            const fn = () => {
                if (c.value) {
                    renderer.value = new WebGLRenderer({
                        canvas: c.value,
                    });
                    renderer.value.setSize(
                        window.innerWidth,
                        window.innerHeight
                    );

                    const controls = new OrbitControls(
                        camera,
                        renderer.value.domElement
                    );

                    renderer.value.render(scene, camera);
                } else {
                    nextTick().then(fn);
                }
            };
            fn();
        });

        let timer = null;
        const resizeFn = () => {
            timer && window.clearTimeout(timer);
            window.setTimeout(() => {
                renderer.value.setSize(window.innerWidth, window.innerHeight);
                renderer.value.render(scene, camera);
            }, 500);
        };

        onUnmounted(() => {
            timer && window.clearTimeout(timer);
        });

        window.addEventListener("resize", resizeFn, false);

        watch(
            [typeVal, renderer],
            ([type, renderer]) => {
                if (geometry) {
                    scene.remove(geometry);
                }

                if (renderer) {
                    geometry = draw({
                        scene,
                        renderer,
                        camera,
                        type,
                    });
                }
            },
            {
                immediate: true,
            }
        );

        return {
            c,
            typeList,
            typeVal,
        };
    },
};
</script>
