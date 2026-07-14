import { DirectionalLight, DirectionalLightHelper, Vector3 } from "three";

export const initDirLight = () => {
  const dirLight = new DirectionalLight("#FFFFFF", 3.0);
  const helper = new DirectionalLightHelper(dirLight);

  dirLight.rotateX(Math.PI / 2);
  dirLight.position.set(-3, 0, 6);

  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(2048 * 2, 2048 * 2);
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 15;

  return {
    addToScene: (scene) => {
      scene.add(dirLight);
      scene.add(helper);
    },
  };
};
