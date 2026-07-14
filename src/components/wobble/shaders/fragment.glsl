uniform vec3 uStartColor;
uniform vec3 uEndColor;

uniform float uRoughnessFactor;
uniform float uMetalnessFactor;

varying vec3 vVertexColor;
varying float vWobble;

void main() {

    vec3 startColor = uStartColor;
    vec3 endColor = uEndColor;

    vec3 color = mix(startColor, endColor, vWobble);

    csm_Metalness = smoothstep(0.1, 0.25, uMetalnessFactor);
    csm_Roughness = 1.0 - smoothstep(-1.0, 1.0, uRoughnessFactor);

    csm_DiffuseColor.rgb = color;
}   