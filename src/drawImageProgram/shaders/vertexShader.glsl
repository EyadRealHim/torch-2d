precision mediump float;

uniform mat4 uniformPositionMat4;
attribute vec2 attrTexCoords;
attribute vec2 attrPosition;

varying vec2 varyTexCoords;

void main() {
    gl_Position = uniformPositionMat4 * vec4(attrPosition, 1, 1);

    varyTexCoords = attrTexCoords;
}