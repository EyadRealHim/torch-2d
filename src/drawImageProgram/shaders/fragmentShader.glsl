precision mediump float;

varying vec2 varyTexCoords;

uniform sampler2D uniformTexture;

void main() {
   gl_FragColor = texture2D(uniformTexture, varyTexCoords);
}