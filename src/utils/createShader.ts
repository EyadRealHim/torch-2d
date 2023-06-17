
export default function createShader(
  gl: WebGLRenderingContext,
  type: "VERTEX_SHADER" | "FRAGMENT_SHADER",
  source: string
) {
  const shader = gl.createShader(gl[type]);

  if (!shader)
    throw new Error("The shader creation process encountered a failure.");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  const log = gl.getShaderInfoLog(shader);
  gl.deleteShader(shader);
  throw log;
}
