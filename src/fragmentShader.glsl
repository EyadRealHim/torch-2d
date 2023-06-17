precision mediump float;

uniform sampler2D uniformImage;
varying vec2 varyTextureCoords;

void main() {
   gl_FragColor = texture2D(uniformImage, varyTextureCoords).rgba * vec4(0.1, 1, 0.3, 1);
}