
export default function createBufferOf32Float(
  gl: WebGLRenderingContext,
  content: number[] | Float32Array,
  usage: "STATIC_DRAW" | "STREAM_DRAW" | "DYNAMIC_DRAW",
  target: "ELEMENT_ARRAY_BUFFER" | "ARRAY_BUFFER" = "ARRAY_BUFFER"
) {
  const buffer = gl.createBuffer();

  if (!buffer)
    throw new Error("The buffer creation process encountered a failure.");

  content =
    content instanceof Float32Array ? content : new Float32Array(content);

  gl.bindBuffer(gl[target], buffer);
  gl.bufferData(gl[target], content, gl[usage]);

  return { buffer, content };
}
