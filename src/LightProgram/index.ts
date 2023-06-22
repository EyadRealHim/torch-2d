import { mat4 } from "gl-matrix";

import fragmentShaderSource from "./shaders/fragmentShader.glsl";
import vertexShaderSource from "./shaders/vertexShader.glsl";

import attributeOf from "../utils/attributeOf";
import createBufferOf32Float from "../utils/createBufferOf32Float";
import createProgram from "../utils/createProgram";
import createShader from "../utils/createShader";
import createTexture, { defaultTextureCoords } from "../utils/createTexture";
import uniformOf from "../utils/uniformOf";
import loadImage from "../utils/loadImage";

export default function createLightProgram(gl: WebGLRenderingContext) {
  const fragmentShader = createShader(gl, "FRAGMENT_SHADER", fragmentShaderSource);
  const vertexShader = createShader(gl, "VERTEX_SHADER", vertexShaderSource);

  const lightProgram = createProgram(gl, [fragmentShader, vertexShader]);

  const coords = createBufferOf32Float(gl, defaultTextureCoords(), "STATIC_DRAW");

  const attrTexCoords = attributeOf(gl, lightProgram, "attrTexCoords", {
    normalized: false,
    type: "FLOAT",
    offset: 0,
    stride: 0,
    size: 2,
  });
  const attrPosition = attributeOf(gl, lightProgram, "attrPosition", {
    normalized: false,
    type: "FLOAT",
    offset: 0,
    stride: 0,
    size: 2,
  });
  const uniformPositionMat4 = uniformOf(
    gl,
    lightProgram,
    "uniformPositionMat4",
    "uniformMatrix4fv"
  );
  const uniformLightTexture = uniformOf(gl, lightProgram, "uniformLightTexture", "uniform1i");
  const uniformTexture = uniformOf(gl, lightProgram, "uniformTexture", "uniform1i");
  let lightTexture: WebGLTexture | null = null;

  loadImage("assets/light.png").then((image) => {
    lightTexture = createTexture(gl, image);
  });

  void lightTexture;

  attrPosition.enable();
  attrTexCoords.enable();

  let targetTexture = createTexture(gl, gl.canvas.width, gl.canvas.height);
  let frameBuffer = gl.createFramebuffer();

  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, targetTexture, 0);

  return {
    bindFrameBuffer() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    },
    drawFrame(x: number, y: number, width: number, height: number) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, lightTexture);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, targetTexture);

      gl.useProgram(lightProgram);

      attrPosition.bindBuffer(coords.buffer);

      attrTexCoords.bindBuffer(coords.buffer);

      const positionMat4 = mat4.create();
      mat4.ortho(positionMat4, 0, gl.canvas.width, gl.canvas.height, 0, -1, 1);
      mat4.translate(positionMat4, positionMat4, [x, y, 0]);
      mat4.scale(positionMat4, positionMat4, [width, height, 1]);


      uniformPositionMat4(false, positionMat4);

      uniformLightTexture(1);
      uniformTexture(0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
  };
}
