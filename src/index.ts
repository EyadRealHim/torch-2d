
const canvas = document.querySelector("canvas")!;
const gl = canvas.getContext("webgl")!;

if (!gl) throw new Error("Webgl isnt supported");

let height: number;
let width: number;

{
  gl.canvas.height = window.innerHeight;
  gl.canvas.width = window.innerWidth;

  const isElem = gl.canvas instanceof HTMLCanvasElement;

  height = isElem ? gl.canvas.clientHeight : gl.canvas.height;
  width = isElem ? gl.canvas.clientWidth : gl.canvas.width;

  gl.viewport(0, 0, width, height);
}
