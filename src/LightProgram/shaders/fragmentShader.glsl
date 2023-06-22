precision mediump float;

varying vec2 varyTexCoords;

uniform sampler2D uniformLightTexture;
uniform sampler2D uniformTexture;

void main() {
   vec4 lightPixel = texture2D(uniformLightTexture, varyTexCoords);
   vec4 scenePixel = texture2D(uniformTexture, varyTexCoords);


   gl_FragColor = scenePixel + lightPixel * vec4(0.19, 0.36, 0.37, 0);
}