import GUI from "lil-gui";

export const initUniformsGUI = (uniforms, onChange) => {
  const gui = new GUI({ title: "Настройка материала" });

  const uniformsFolder = gui.addFolder("Uniforms");

  uniformsFolder
    .add(uniforms.uTimeFrequency, "value", 0, 1, 0.01)
    .name("uTimeFrequency")
    .onChange(onChange);

  uniformsFolder
    .add(uniforms.uSimplexIterations, "value", 0, 5, 1)
    .name("uSimplexIterations")
    .onChange(onChange);

  uniformsFolder
    .add(uniforms.uPositionFrequency, "value", 0, 1, 0.01)
    .name("positionFrequency")
    .onChange(onChange);

  uniformsFolder
    .add(uniforms.uSimplexFrequency, "value", 0, 1, 0.01)
    .name("simplexFrequency")
    .onChange(onChange);

  uniformsFolder
    .addColor(uniforms.uStartColor, "value")
    .name("startColor")
    .onChange(onChange);

  uniformsFolder
    .addColor(uniforms.uEndColor, "value")
    .name("endColor")
    .onChange(onChange);

  uniformsFolder
    .add(uniforms.uRoughnessFactor, "value", -1, 1, 0.1)
    .name("roughnessFactor")
    .onChange(onChange);

  uniformsFolder
    .add(uniforms.uMetalnessFactor, "value", 0.1, 0.25, 0.01)
    .name("metalnessFactor")
    .onChange(onChange);

  uniformsFolder.open();
};
