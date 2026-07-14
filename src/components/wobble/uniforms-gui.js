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
    .name("uPositionFrequency")
    .onChange(onChange);

  uniformsFolder
    .add(uniforms.uSimplexFrequency, "value", 0, 1, 0.01)
    .name("uSimplexFrequency")
    .onChange(onChange);

  uniformsFolder
    .addColor(uniforms.uStartColor, "value")
    .name("uStartColor")
    .onChange(onChange);

  uniformsFolder
    .addColor(uniforms.uEndColor, "value")
    .name("uEndColor")
    .onChange(onChange);

  uniformsFolder.open();
};
