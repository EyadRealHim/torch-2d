precision mediump float;

uniform mat3 uniformModelViewMat3;
uniform vec2 uniformResolution;
attribute vec2 attrPosition;

void main() {
    vec2 position = (uniformModelViewMat3 * vec3(attrPosition, 1)).xy / uniformResolution;

    position = position * 2.0 - 1.0;
    position = position * vec2(1, -1);

    gl_Position = vec4(position, 1, 1);
}