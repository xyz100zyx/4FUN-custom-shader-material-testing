import {
  Color,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshPhysicalMaterial,
  PlaneGeometry,
  RGBADepthPacking,
  Uniform,
  Vector3,
} from "three";
import CSM from "three-custom-shader-material/vanilla";

import { initShadowReciever } from "./shadow-reciever";
import { initDirLight } from "./dir-light";
import { initUniformsGUI } from "./uniforms-gui";
import { roughness } from "three/tsl";
import { Wireframe } from "three/examples/jsm/Addons.js";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils";

import { Tick } from "@shared/tick";

export const initWobble = (scene, camera, renderer) => {
  let geometry = new IcosahedronGeometry(2.5, 50);
  geometry = mergeVertices(geometry);
  geometry.computeTangents();

  const uniforms = {
    uTime: new Uniform(0),
    uTimeFrequency: new Uniform(0.4),
    uSimplexIterations: new Uniform(0),
    uPositionFrequency: new Uniform(0),
    uSimplexFrequency: new Uniform(0.25),
    uStartColor: new Uniform(new Color(115 / 255, 255 / 255, 77 / 255)),
    uEndColor: new Uniform(new Color(255 / 255, 28 / 255, 28 / 255)),
    uRoughnessFactor: new Uniform(1),
    uMetalnessFactor: new Uniform(0.18),
  };

  const material = new CSM({
    baseMaterial: MeshPhysicalMaterial,

    uniforms,

    transparent: true,
    wireframe: false,
    castShadowNode: true,
    vertexShader,
    fragmentShader,
  });

  const depthMaterial = new CSM({
    baseMaterial: MeshDepthMaterial,
    vertexShader,
    depthPacking: RGBADepthPacking,
    uniforms,
  });

  const recieverPublicApi = initShadowReciever();
  recieverPublicApi.addToScene(scene);

  const dirLightPublicApi = initDirLight();
  dirLightPublicApi.addToScene(scene);

  initUniformsGUI(uniforms, () => (material.needsUpdate = true));

  const wobble = new Mesh(geometry, material);
  wobble.customDepthMaterial = depthMaterial;
  wobble.position.set(-3, 0, 1.5);
  wobble.scale.setScalar(0.2);
  wobble.receiveShadow = true;
  wobble.castShadow = true;

  scene.add(wobble);

  const tick = new Tick();
  tick.addTickCallback((elapsedTime) => {
    uniforms.uTime.value = elapsedTime;
    material.uniforms.needsUpdate = true;
    depthMaterial.uniforms.needsUpdate = true;
  });
};
