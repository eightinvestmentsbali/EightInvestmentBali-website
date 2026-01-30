import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

in vec2 vUv;
out vec4 out_color;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_mouse;
uniform vec3 u_colorA;
uniform vec3 u_colorB;

#define PI 3.14159265359

// Rotation function
vec2 rot(vec2 v, float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c) * v;
}

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Bounce easing
float bounceIn(float t) { return abs(sin(6.28 * t) * (1.0 - t)); }

void main() {
    vec2 st = vUv * vec2(u_resolution.x / u_resolution.y, 1.0);
    st = rot(st, -PI / 8.0);

    vec2 mouse = u_mouse.xy / u_resolution;

    // Approximating psrdnoise with rotated simplex noise
    vec2 pos = vec2(3.0) * st;
    float rotAngle = 1.2 * u_time + mouse.y * PI;
    float n = snoise(rot(pos, rotAngle));

    float lines = cos((st.x + n * 0.1 + mouse.x + 0.2) * PI);

    vec3 color = mix(
        u_colorA,
        u_colorB,
        bounceIn(lines * 0.5 + 0.5)
    );

    out_color = vec4(color, 1.0);
}
`;

export function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const targetMouse = useRef(new THREE.Vector2());
  const currentMouse = useRef(new THREE.Vector2());

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.current.x = event.clientX;
      targetMouse.current.y = event.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(({ clock, size }) => {
    if (!materialRef.current) return;

    // Slow down the animation
    materialRef.current.uniforms.u_time.value = clock.elapsedTime * 0.1;

    // Smoothly interpolate mouse position for a softer effect
    currentMouse.current.lerp(targetMouse.current, 0.05);

    materialRef.current.uniforms.u_mouse.value.set(
      currentMouse.current.x,
      size.height - currentMouse.current.y, // Invert Y for GL
      0, 0
    );

    materialRef.current.uniforms.u_resolution.value.set(
      size.width,
      size.height
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        glslVersion={THREE.GLSL3}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector4() },
          u_resolution: { value: new THREE.Vector2() },
          u_colorA: { value: new THREE.Color("rgb(209, 92, 251)") },
          u_colorB: { value: new THREE.Color("#ffffff") },
        }}
      />
    </mesh>
  );
}
