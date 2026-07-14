#include ./simplexNoise4d

attribute vec4 tangent;
uniform float uTime;
uniform float uTimeFrequency;
uniform int uSimplexIterations;
uniform float uPositionFrequency;
uniform float uSimplexFrequency;

#define NEAREST_POINT_SHIFT 0.01

varying vec3 vVertexColor;
varying float vWobble;

float getWobble(vec3 position){

    float time = uTime * uTimeFrequency;

    vec3 transformedPosition = position * (1.0 - uPositionFrequency) + vec3(uPositionFrequency);

    for(int i = 0; i < uSimplexIterations; i++) {
        transformedPosition += snoise(vec4(transformedPosition, time)) * (1.0 - uSimplexFrequency);
    }

    return snoise(vec4(transformedPosition, time));
}

void main() {

    vec3 bitangent = cross(normal, tangent.xyz);

    vec3 nearestPointA = csm_Position + tangent.xyz * NEAREST_POINT_SHIFT;
    vec3 nearestPointB = csm_Position + bitangent.xyz * NEAREST_POINT_SHIFT;

    vec3 sourceVectorPosition = csm_Position.xyz;

    float wobble = getWobble(sourceVectorPosition);

    sourceVectorPosition += wobble * normal;

    nearestPointA += getWobble(nearestPointA) * normal;
    nearestPointB += getWobble(nearestPointB) * normal;

    vec3 fromPositionToPointA = normalize(nearestPointA - sourceVectorPosition);
    vec3 fromPositionToPointB = normalize(nearestPointB - sourceVectorPosition);
 
    vec3 csm_Normal = cross(fromPositionToPointA, fromPositionToPointB);

    csm_Position += sourceVectorPosition;

    vVertexColor = csm_Position.xyz;
    vWobble = wobble;
}