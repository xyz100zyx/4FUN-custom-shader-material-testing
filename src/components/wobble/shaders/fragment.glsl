uniform vec3 uStartColor;
uniform vec3 uEndColor;

varying vec3 vVertexColor;
varying float vWobble;

void main() {

    vec3 startColor = uStartColor;
    vec3 endColor = uEndColor;

    vec3 color = mix(startColor, endColor, vWobble);

    csm_FragColor.rgb = color;
}