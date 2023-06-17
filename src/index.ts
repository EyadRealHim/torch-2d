import { mat3, vec2 } from "gl-matrix";

import fragmentShaderSource from "./fragmentShader.glsl";
import vertexShaderSource from "./vertexShader.glsl";

import attributeOf from "./utils/attributeOf";
import createBufferOf32Float from "./utils/createBufferOf32Float";
import createProgram from "./utils/createProgram";
import createShader from "./utils/createShader";
import uniformOf from "./utils/uniformOf";

// import createTexture from "./utils/createTexture";
// import loadImage from "./utils/loadImage";
const canvas = document.querySelector("canvas")!;
const gl = canvas.getContext("webgl")!;

if (!gl) throw new Error("Webgl isnt supported");

// const torchTexture = createTexture(gl, await loadImage("assets/torch.png"));
let height: number = gl.canvas.height;
let width: number = gl.canvas.width;

const resize = () => {
  gl.canvas.height = window.innerHeight;
  gl.canvas.width = window.innerWidth;

  const isElem = gl.canvas instanceof HTMLCanvasElement;

  height = isElem ? gl.canvas.clientHeight : gl.canvas.height;
  width = isElem ? gl.canvas.clientWidth : gl.canvas.width;

  gl.viewport(0, 0, width, height);

  uniformResolution(width, height);
};

const fragmentShader = createShader(
  gl,
  "FRAGMENT_SHADER",
  fragmentShaderSource
);
const vertexShader = createShader(gl, "VERTEX_SHADER", vertexShaderSource);

const program = createProgram(gl, [fragmentShader, vertexShader]);

const tempBuffer = createBufferOf32Float(
  gl,
  [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  "STATIC_DRAW",
  "ARRAY_BUFFER"
);

const uniformResolution = uniformOf(
  gl,
  program,
  "uniformResolution",
  "uniform2f"
);

const uniformModelViewMat3 = uniformOf(
  gl,
  program,
  "uniformModelViewMat3",
  "uniformMatrix3fv"
);

const attrPosition = attributeOf(gl, program, "attrPosition", {
  normalized: false,
  type: "FLOAT",
  offset: 0,
  stride: 0,
  size: 2,
});

gl.useProgram(program);

{
  window.addEventListener("resize", resize);
  resize();
}

const tempModelViewMat3 = mat3.create();
const mouseCoords = vec2.fromValues(0, 0);
const updateTempModelViewMat3 = () => {
  const scale = 100;

  mat3.identity(tempModelViewMat3);
  mat3.translate(tempModelViewMat3, tempModelViewMat3, [
    mouseCoords[0],
    mouseCoords[1],
  ]);
  mat3.scale(tempModelViewMat3, tempModelViewMat3, [scale, scale]);
  mat3.rotate(
    tempModelViewMat3,
    tempModelViewMat3,
    Math.PI * (mouseCoords[0] / 300)
  );
  mat3.translate(tempModelViewMat3, tempModelViewMat3, [-0.5, -0.5]);
  uniformModelViewMat3(false, tempModelViewMat3);

  draw();
};

attrPosition.bindBuffer(tempBuffer.buffer, "ARRAY_BUFFER");
attrPosition.enable();

updateTempModelViewMat3();
{
  canvas.addEventListener("mousemove", function ({ x, y }) {
    vec2.set(mouseCoords, x, y);
    updateTempModelViewMat3();
  });
}

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, tempBuffer.content.length / 2);
}
