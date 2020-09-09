import React from "react";
import * as THREE from "three";

const Ecg = () => {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  let renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#e5e5e5");
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  let cubes = [];

  for (let i = 0; i < 10000; i++) {
    let obj = new THREE.BoxGeometry();
    let mat = new THREE.MeshLambertMaterial({ color: 0xffccff });
    let cub = new THREE.Mesh(obj, mat);
    scene.add(cub);
    cubes[i] = cub;
    cub.position.set(i % 15, i / 10, i / 10);
  }

  let light = new THREE.PointLight(0xfffff, 1, 500);
  light.position.set(10, 0, 25);
  scene.add(light);

  camera.position.z = 10;
  camera.position.y = 10;

  var render = function () {
    requestAnimationFrame(render);

    for (let i in cubes) {
      cubes[i].rotation.x += 0.05;
      cubes[i].rotation.y += 0.01;
    }

    renderer.render(scene, camera);
  };

  render();

  return <div></div>;
};

export default Ecg;
