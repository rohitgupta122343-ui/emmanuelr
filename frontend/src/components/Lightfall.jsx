import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

varying vec2 vUv;

float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;

  // Background gradient
  vec3 color = mix(vec3(0.02,0.03,0.10), vec3(0.04,0.08,0.25), uv.y);

  // Falling streaks
  for(int i = 0; i < 4; i++) {
    float fi = float(i);
    float x = fract(hash(vec2(fi, fi*2.0)) + fi * 0.23);
    float speed = 0.25 + fi * 0.12;
    float y = fract(iTime * speed + hash(vec2(fi*3.0, 1.0)));

    vec2 p = uv - vec2(x, y);

    float line = exp(-abs(p.x) * 120.0) * exp(-max(p.y,0.0) * 20.0);

    vec3 c = mix(vec3(0.6,0.8,1.0), vec3(1.0,0.6,1.0), fi/4.0);

    color += c * line * 0.8;
  }

  // Touch / mouse glow
  vec2 m = iMouse / iResolution;
  float d = distance(uv, vec2(m.x, 1.0 - m.y));
  color += vec3(0.4,0.6,1.0) * exp(-d * 12.0) * 0.4;

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function Lightfall({ className = "" }) {
  const ref = useRef();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        iMouse: { value: [0, 0] },
      },
    });

    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program,
    });

    function resize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.iResolution.value = [w, h];
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Mouse
    const onMove = (e) => {
      const rect = gl.canvas.getBoundingClientRect();
      program.uniforms.iMouse.value = [
        e.clientX - rect.left,
        e.clientY - rect.top,
      ];
    };

    // Touch
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = gl.canvas.getBoundingClientRect();
      program.uniforms.iMouse.value = [
        t.clientX - rect.left,
        t.clientY - rect.top,
      ];
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    let raf;
    const start = performance.now();

    const update = () => {
      program.uniforms.iTime.value = (performance.now() - start) * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      ro.disconnect();
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
      renderer.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full h-full overflow-hidden relative ${className}`}
    />
  );
}