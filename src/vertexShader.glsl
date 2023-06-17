precision mediump float;

attribute vec2 attrTextureCoords;
uniform vec2 uniformResolution;
attribute vec2 attrPosition;

varying vec2 varyTextureCoords;

void main() {
    varyTextureCoords = attrTextureCoords;

    vec2 position = attrPosition / uniformResolution;

    position = position * 2.0 - 1.0;

    gl_Position = vec4(position * vec2(1, -1), 0, 1);
}