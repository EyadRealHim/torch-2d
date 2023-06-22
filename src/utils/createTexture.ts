export default function createTexture(
  gl: WebGLRenderingContext,
  width: number,
  height: number
): WebGLTexture | null;
export default function createTexture(
  gl: WebGLRenderingContext,
  source: TexImageSource
): WebGLTexture | null;
export default function createTexture(
  gl: WebGLRenderingContext,
  sourceOrWidth: TexImageSource | number,
  height?: number
): WebGLTexture | null {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  if (typeof sourceOrWidth == "number") {
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      sourceOrWidth,
      height!,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );
  } else {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceOrWidth);
  }

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  return texture;
}

export function defaultTextureCoords() {
  // prettier-ignore
  return new Float32Array([
    0, 0, 0, 1, 1, 0,
    1, 0, 0, 1, 1, 1,
  ]);
}
