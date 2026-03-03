export const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;





export const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;

uniform vec3 uBlue;
uniform vec3 uCyan;
uniform vec3 uPink;
uniform vec3 uRed;

varying vec2 vUv;

/* ---------- NOISE ---------- */
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 m = uMouse;
  float t = uTime * 0.6;

  /* -------- distort first -------- */
  uv.x *= 1.25;
  uv.y *= 0.85;

  uv += vec2(
    fbm(uv * 1.4 + vec2(0.0, t)),
    fbm(uv * 1.4 + vec2(t, 0.0))
  ) * 0.22;

  uv.y += sin(uv.y * 3.2 + t) * 0.07;

  /* -------- mouse influence -------- */
  vec2 d = uv - m;
  uv += d * exp(-dot(d, d) * 5.0) * 0.18;

  /* -------- RIGHT PADDING (NO EDGE LINE) -------- */
  float rightStart = 0.62;
  float rightEnd   = 0.88;

  float rightMask =
    smoothstep(rightStart, rightStart + 0.06, uv.x) *
    (1.0 - smoothstep(rightEnd, rightEnd + 0.05, uv.x));

  /* -------- FAT WAVE BODY -------- */
  float wave =
    fbm(uv * 2.5 + t) +
    0.6 * fbm(uv * 4.5 - t);

  float ridge = abs(wave - 0.55);

  float thickness = 0.28;
  float softness  = 0.10;

  float mask = smoothstep(thickness, thickness - softness, ridge);
  mask = clamp(mask, 0.0, 1.0);

  /* -------- COLOR ZONES -------- */
  float low  = smoothstep(0.35, 0.55, wave);
  float mid  = smoothstep(0.55, 0.72, wave);
  float high = smoothstep(0.72, 0.9, wave);

  vec3 color = uBlue;
  color = mix(color, uCyan, low);
  color = mix(color, uPink, mid);
  color = mix(color, uRed, high);

  color *= 0.85;

  float alpha =
    mask *
    rightMask *
    (0.7 + mid * 0.35 + high * 0.45);

  gl_FragColor = vec4(color, alpha);
}
`;

