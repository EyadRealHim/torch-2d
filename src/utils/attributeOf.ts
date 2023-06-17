
export default function attributeOf(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  info: {
    size: number;
    type: "FLOAT" | "BYTE" | "SHORT" | "UNSIGNED_BYTE" | "UNSIGNED_SHORT";
    normalized: boolean;
    stride: number;
    offset: number;
  } | null = null
) {
  const loc = gl.getAttribLocation(program, name);

  return {
    bindBuffer(
      buffer: WebGLBuffer,
      target: "ELEMENT_ARRAY_BUFFER" | "ARRAY_BUFFER" = "ARRAY_BUFFER"
    ) {
      if (!info)
        throw new Error("Attempting to bind without setting the pointer.");

      gl.bindBuffer(gl[target], buffer);
      gl.vertexAttribPointer(
        loc,
        info.size,
        gl[info.type],
        info.normalized,
        info.stride,
        info.offset
      );
    },
    setPointer(_info: NonNullable<typeof info>) {
      info = _info;
    },
    enable() {
      gl.enableVertexAttribArray(loc);
    },
    disable() {
      gl.disableVertexAttribArray(loc);
    },
  };
}
