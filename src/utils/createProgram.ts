
export default function createProgram(
  gl: WebGLRenderingContext,
  shaders: WebGLShader[]
) {
  const program = gl.createProgram();

  if (!program) throw new Error("The program creation process encountered a failure.");

  for (let shader of shaders) {
    gl.attachShader(program, shader);
  }

  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  const log = gl.getProgramInfoLog(program);
  gl.deleteProgram(program);
  throw log;
}
