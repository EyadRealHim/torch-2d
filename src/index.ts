import { mat3, vec2, vec3 } from "gl-matrix";

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

const uniformColor = uniformOf(gl, program, "uniformColor", "uniform4f");

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
const drawModelViewMat3 = (
  x: number,
  y: number,
  scale: number,
  rotate: number
) => {
  mat3.identity(tempModelViewMat3);
  mat3.translate(tempModelViewMat3, tempModelViewMat3, [x, y]);
  mat3.scale(tempModelViewMat3, tempModelViewMat3, [scale, scale]);
  mat3.rotate(tempModelViewMat3, tempModelViewMat3, rotate);
  mat3.translate(tempModelViewMat3, tempModelViewMat3, [-0.5, -0.5]);
  uniformModelViewMat3(false, tempModelViewMat3);

  gl.drawArrays(gl.TRIANGLES, 0, tempBuffer.content.length / 2);
};

function setColor(code: number) {
  uniformColor(
    ((code & 0xff0000) >> 16) / 255,
    ((code & 0x00ff00) >> 8) / 255,
    (code & 0x0000ff) / 255,
    1.0
  );
}

attrPosition.bindBuffer(tempBuffer.buffer, "ARRAY_BUFFER");
attrPosition.enable();

{
  canvas.addEventListener("mousemove", function ({ x, y }) {
    vec2.set(mouseCoords, x, y);
  });
}

const gameObjects = new Array(500).fill(0).map(() => {
  return vec3.fromValues(Math.random(), Math.random(), Math.random());
});

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let object of gameObjects) {
    const x = object[0] * width;
    const y = object[1] * height;
    const scale = 55;

    setColor(0x0f0f0f);
    drawModelViewMat3(x, y, scale, object[2] * Math.PI * 2);
    setColor(object[2] * 0xffffff);
    drawModelViewMat3(x, y, scale - 5, object[2] * Math.PI * 2);
  }

  setColor(0xf0ff00);
  drawModelViewMat3(mouseCoords[0], mouseCoords[1], 100, 0);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
