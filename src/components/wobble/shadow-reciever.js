import { Mesh, MeshPhysicalMaterial, PlaneGeometry } from "three";
import { MeshStandardMaterial } from "three/webgpu";

export const initShadowReciever = () => {
  const shadowReciever = new Mesh(
    new PlaneGeometry(3, 3),
    new MeshStandardMaterial({
      color: "0xFFF",
    }),
  );
  shadowReciever.receiveShadow = true;
  shadowReciever.castShadow = true;
  shadowReciever.position.set(-2, 0, 0);

  shadowReciever.rotateY(-Math.PI / 6);

  return {
    addToScene: (scene) => scene.add(shadowReciever),
  };
};
