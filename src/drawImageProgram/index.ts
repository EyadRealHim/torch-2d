import { mat4 } from "gl-matrix";

import fragmentShaderSource from "./shaders/fragmentShader.glsl";
import vertexShaderSource from "./shaders/vertexShader.glsl";

import attributeOf from "../utils/attributeOf";
import createBufferOf32Float from "../utils/createBufferOf32Float";
import createProgram from "../utils/createProgram";
import createShader from "../utils/createShader";
import { defaultTextureCoords } from "../utils/createTexture";
import uniformOf from "../utils/uniformOf";

export default function createDrawImageProgram(gl: WebGLRenderingContext) {
  const fragmentShader = createShader(gl, "FRAGMENT_SHADER", fragmentShaderSource);
  const vertexShader = createShader(gl, "VERTEX_SHADER", vertexShaderSource);

  const drawImageProgram = createProgram(gl, [fragmentShader, vertexShader]);

  const coords = createBufferOf32Float(gl, defaultTextureCoords(), "STATIC_DRAW");

  const attrTexCoords = attributeOf(gl, drawImageProgram, "attrTexCoords", {
    normalized: false,
    type: "FLOAT",
    offset: 0,
    stride: 0,
    size: 2,
  });
  const attrPosition = attributeOf(gl, drawImageProgram, "attrPosition", {
    normalized: false,
    type: "FLOAT",
    offset: 0,
    stride: 0,
    size: 2,
  });
  const uniformPositionMat4 = uniformOf(
    gl,
    drawImageProgram,
    "uniformPositionMat4",
    "uniformMatrix4fv"
  );
  const uniformTexture = uniformOf(gl, drawImageProgram, "uniformTexture", "uniform1i");

  attrTexCoords.enable();
  attrPosition.enable();

  return function drawImage(
    texture: WebGLTexture,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.useProgram(drawImageProgram);

    attrPosition.bindBuffer(coords.buffer);
    attrTexCoords.bindBuffer(coords.buffer);

    const positionMat4 = mat4.create();
    mat4.ortho(positionMat4, 0, gl.canvas.width, gl.canvas.height, 0, -1, 1);
    mat4.translate(positionMat4, positionMat4, [x, y, 0]);
    mat4.scale(positionMat4, positionMat4, [width, height, 1]);

    uniformPositionMat4(false, positionMat4);
    uniformTexture(0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
}
