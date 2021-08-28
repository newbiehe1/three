import {
    BoxGeometry,
    Mesh,
    MeshLambertMaterial,
    ConeGeometry,
    CylinderGeometry,
    CircleGeometry,
    DodecahedronGeometry,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments,
    ExtrudeGeometry,
    Shape,
    MeshPhongMaterial,
} from "three";

const box = ({ scene, renderer, camera }) => {
    const geometry = new BoxGeometry(100, 100, 100);
    const material = new MeshLambertMaterial({ color: 0xffff00 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    animation({
        scene,
        renderer,
        camera,
        geometry: cube,
    });
    return cube;
};

const circle = ({ scene, renderer, camera }) => {
    const geometry = new CircleGeometry(50, 64);
    const material = new MeshLambertMaterial({
        color: 0xffff00,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    animation({
        scene,
        renderer,
        camera,
        geometry,
    });
    return mesh;
};

const cone = ({ scene, renderer, camera }) => {
    const geometry = new ConeGeometry(50, 100, 64);
    const material = new MeshLambertMaterial({
        color: 0xffff00,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    animation({
        scene,
        renderer,
        camera,
        geometry,
    });
    return mesh;
};

const cylinder = ({ scene, renderer, camera }) => {
    const geometry = new CylinderGeometry(50, 50, 200, 64);
    const material = new MeshLambertMaterial({
        color: 0xffff00,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    animation({
        scene,
        renderer,
        camera,
        geometry,
    });
    return mesh;
};

const dodecahedron = ({ scene, renderer, camera }) => {
    const geometry = new DodecahedronGeometry(50);
    const material = new MeshLambertMaterial({
        color: 0xffff00,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    animation({
        scene,
        renderer,
        camera,
        geometry,
    });
    return mesh;
};

const edges = ({ scene, renderer, camera }) => {
    const geometry = new BoxGeometry(100, 100, 100);
    const edges = new EdgesGeometry(geometry);
    const material = new LineBasicMaterial({ color: 0xffff00 });
    const line = new LineSegments(edges, material);
    scene.add(line);
    renderer.render(scene, camera);
    return line;
};

const extrude = ({ scene, renderer, camera }) => {
    const [x, y] = [0, 0];
    const heartShape = new Shape();

    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const extrudeConfig = {
        steps: 2,
        depth: 3,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,
    };

    const geometry = new ExtrudeGeometry(heartShape, extrudeConfig);
    const material = new MeshLambertMaterial({
        color: 0xffff00,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    animation({ scene, renderer, camera, geometry });
    return mesh;
};

const icosahedron = () => {};

function animation({ scene, renderer, camera, geometry }) {
    geometry.rotateX(0.01);
    geometry.rotateY(0.01);
    renderer.render(scene, camera);
    window.requestAnimationFrame(() => {
        animation({
            scene,
            renderer,
            camera,
            geometry,
        });
    });
}

export const draw = ({ scene, renderer, camera, type }) => {
    switch (type) {
        case "box":
            return box({ scene, renderer, camera });
        case "circle":
            return circle({ scene, renderer, camera });
        case "cone":
            return cone({ scene, renderer, camera });
        case "cylinder":
            return cylinder({ scene, renderer, camera });
        case "dodecahedron":
            return dodecahedron({ scene, renderer, camera });
        case "edges":
            return edges({ scene, renderer, camera });
        case "extrude":
            return extrude({ scene, renderer, camera });
        case "icosahedron":
            return icosahedron({ scene, renderer, camera });
    }
};
