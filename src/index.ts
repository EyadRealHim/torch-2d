import createLightProgram from "./LightProgram";
import createDrawImageProgram from "./drawImageProgram";

import createTexture from "./utils/createTexture";
import loadImage from "./utils/loadImage";

const canvas = document.querySelector("canvas")!;
const gl = canvas.getContext("webgl")!;

if (!gl) throw new Error("Webgl isnt supported");

const brickTexture = createTexture(gl, await loadImage("assets/brick.jpeg"))!;
const fire1Texture = createTexture(gl, await loadImage("assets/fire/fire (5).png"))!;

if (!brickTexture) throw new Error("Failed.");
if (!fire1Texture) throw new Error("Failed.");

let height: number = gl.canvas.height;
let width: number = gl.canvas.width;

const resize = () => {
  gl.canvas.height = window.innerHeight;
  gl.canvas.width = window.innerWidth;

  const isElem = gl.canvas instanceof HTMLCanvasElement;

  height = isElem ? gl.canvas.clientHeight : gl.canvas.height;
  width = isElem ? gl.canvas.clientWidth : gl.canvas.width;

  gl.viewport(0, 0, width, height);
};

resize();

const light = createLightProgram(gl);
const drawImage = createDrawImageProgram(gl);
const offset: [number, number] = [width / 2, height / 2];
const activeKeys: string[] = [];

document.addEventListener("keydown", (e) => !activeKeys.includes(e.key) && activeKeys.push(e.key));
document.addEventListener("keyup", (e) => activeKeys.splice(activeKeys.indexOf(e.key), 1));

setInterval(() => {
  if (activeKeys.length) {
    frame();
  }
}, 1e3 / 60);

function frame() {
  light.bindFrameBuffer();

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const [x, y] = offset;

  const hh = height / 2;
  const hw = width / 2;

  const by = (hh - y) % height;
  const bx = (hw - x) % width;

  drawImage(brickTexture, bx, by, width, height);
  drawImage(brickTexture, bx + width, by, width, height);
  drawImage(brickTexture, bx - width, by, width, height);

  drawImage(brickTexture, bx, by + height, width, height);
  drawImage(brickTexture, bx + width, by + height, width, height);
  drawImage(brickTexture, bx - width, by + height, width, height);

  drawImage(brickTexture, bx, by - height, width, height);
  drawImage(brickTexture, bx + width, by - height, width, height);
  drawImage(brickTexture, bx - width, by - height, width, height);

  const size = 75;

  drawImage(fire1Texture, (width - size) / 2, (height - size) / 2, size, size);

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  light.drawFrame(0, 0, width, height);

  doAction();
}

function doAction() {
  const speed = 15;
  if (activeKeys.includes("w")) {
    offset[1] -= speed;
  }
  if (activeKeys.includes("s")) {
    offset[1] += speed;
  }
  if (activeKeys.includes("a")) {
    offset[0] -= speed;
  }
  if (activeKeys.includes("d")) {
    offset[0] += speed;
  }
}

requestAnimationFrame(frame);
