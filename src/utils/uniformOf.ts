
export default function uniformOf<
  K extends
    | "uniform1f"
    | "uniform1fv"
    | "uniform1i"
    | "uniform1iv"
    | "uniform2f"
    | "uniform2fv"
    | "uniform2i"
    | "uniform2iv"
    | "uniform3f"
    | "uniform3fv"
    | "uniform3i"
    | "uniform3iv"
    | "uniform4f"
    | "uniform4fv"
    | "uniform4i"
    | "uniform4iv"
    | "uniformMatrix2fv"
    | "uniformMatrix3fv"
    | "uniformMatrix4fv"
>(gl: WebGLRenderingContext, program: WebGLProgram, name: string, type: K) {
  const loc = gl.getUniformLocation(program, name);
  type SkipFirstElement<T> = T extends [infer _First, ...infer Rest]
    ? Rest
    : never;
  type parameters = SkipFirstElement<Parameters<(typeof gl)[K]>>;

  return function (...args: parameters) {
    // @ts-ignore
    gl[type](loc, ...args);
  };
}
