"use client";

import { useEffect, useRef, type RefObject } from "react";
import { MOTION_QUERY, NARROW_QUERY } from "@/lib/motion";

// Paper-grain shader behind the opening chapter (plan KTD4). Raw WebGL, one
// fullscreen triangle. `messRef` (1 busy, 0 clean) is driven by the scroll
// timeline. The canvas stays invisible until it has drawn, so the CSS paper
// texture (.opening-paper) shows before load, without WebGL, after a lost
// context, and once the grain is dropped for lagging frames.

const VERTEX = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;
uniform float t, m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
void main(){
  vec2 uv=gl_FragCoord.xy/r;
  vec3 clean=vec3(.957,.941,.91);
  vec3 warm=vec3(.93,.89,.82);
  float blotch=n(uv*vec2(3.,2.)+t*.03)*.6+n(uv*9.)*.4;
  vec3 c=mix(clean,warm,m*blotch);
  float g=h(gl_FragCoord.xy+fract(t)*100.)-.5;
  c+=g*(.015+.045*m);
  float v=distance(uv,vec2(.5));
  c*=1.-m*.22*v*v;
  gl_FragColor=vec4(c,1.);
}`;

const MAX_DPR = 1.5;
// Frame-lag drop (R18): after a warm-up, average frame time over a window.
const WARMUP_FRAMES = 20;
const SAMPLE_FRAMES = 60;
const MAX_AVG_FRAME_MS = 34;

type Renderer = { draw: (time: number, mess: number) => void; dispose: () => void };

function createRenderer(gl: WebGLRenderingContext, canvas: HTMLCanvasElement): Renderer | null {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vertex = compile(gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const dispose = () => {
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
  };
  if (!vertex || !fragment || !program || !buffer) {
    dispose();
    return null;
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    dispose();
    return null;
  }
  gl.useProgram(program);

  // One triangle that covers the viewport.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uResolution = gl.getUniformLocation(program, "r");
  const uTime = gl.getUniformLocation(program, "t");
  const uMess = gl.getUniformLocation(program, "m");

  return {
    draw(time, mess) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uMess, mess);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose,
  };
}

export function GrainCanvas({ messRef }: { messRef: RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // No loseContext() on cleanup: a canvas whose context was deliberately
    // lost can't get a new one, which would break React Strict Mode's
    // remount. Cleanup frees the GL objects instead.
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // CSS texture stays.

    const animateMq = window.matchMedia(MOTION_QUERY);
    const narrowMq = window.matchMedia(NARROW_QUERY);
    let renderer = createRenderer(gl, canvas);
    let frame = 0;
    let onScreen = true;
    let lost = false;
    let dropped = false;
    let lastTime = 0;
    let frameCount = 0;
    let sampleMs = 0;

    const setVisible = (visible: boolean) => {
      if (visible) canvas.dataset.ready = "true";
      else delete canvas.dataset.ready;
    };

    const resize = () => {
      // Half resolution on phones: the grain is the first detail reduced (R18).
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR) * (narrowMq.matches ? 0.5 : 1);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    };

    const drawStill = () => {
      if (!renderer || lost || dropped) return;
      // Still frames only happen where the chapter is static, which is
      // always its finished (clean) state.
      renderer.draw(0, 0);
      setVisible(true);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (lastTime) {
        frameCount += 1;
        if (frameCount > WARMUP_FRAMES) sampleMs += now - lastTime;
        if (frameCount === WARMUP_FRAMES + SAMPLE_FRAMES) {
          if (sampleMs / SAMPLE_FRAMES > MAX_AVG_FRAME_MS) {
            dropped = true;
            setVisible(false);
            stop();
            return;
          }
          frameCount = WARMUP_FRAMES;
          sampleMs = 0;
        }
      }
      lastTime = now;
      renderer?.draw(now / 1000, messRef.current);
      setVisible(true);
    };

    const update = () => {
      const shouldAnimate =
        animateMq.matches && onScreen && document.visibilityState === "visible" && !lost && !dropped && renderer;
      if (shouldAnimate && !frame) {
        // Restart lag sampling so a pause doesn't count as a slow frame.
        lastTime = 0;
        frameCount = 0;
        sampleMs = 0;
        frame = requestAnimationFrame(tick);
      } else if (!shouldAnimate) {
        stop();
        // Reduced motion (or a static layout) gets one still frame.
        if (!animateMq.matches) drawStill();
      }
    };

    const onLost = (event: Event) => {
      event.preventDefault(); // allows webglcontextrestored to fire
      lost = true;
      stop();
      setVisible(false);
    };
    const onRestored = () => {
      lost = false;
      renderer = createRenderer(gl, canvas);
      resize();
      update();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!frame) drawStill();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });

    resize();
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", update);
    animateMq.addEventListener("change", update);
    narrowMq.addEventListener("change", resize);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    update();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", update);
      animateMq.removeEventListener("change", update);
      narrowMq.removeEventListener("change", resize);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      renderer?.dispose();
      setVisible(false);
    };
  }, [messRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-500 data-[ready=true]:opacity-100"
    />
  );
}
