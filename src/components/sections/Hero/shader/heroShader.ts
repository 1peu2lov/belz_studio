/**
 * Belz Studio — Hero shader sombre (verre pétrole, arcs courbes, inertie).
 */

export const heroVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const heroFragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec2 uPointerVelocity;
uniform float uReducedMotion;
uniform float uIsMobile;
uniform float uPointerActive;

uniform vec3 uBackground;
uniform vec3 uDeepBlack;
uniform vec3 uDarkPetrol;
uniform vec3 uMediumPetrol;
uniform vec3 uGreenPetrol;
uniform vec3 uSoftReflection;
uniform vec3 uBrightReflection;

uniform float uIdleSpeed;
uniform float uInfluenceRadius;
uniform float uDistortionStrength;
uniform float uVelocityInfluence;
uniform float uTrailStretch;
uniform float uRefractionStrength;
uniform float uAberrationStrength;
uniform float uHighlightStrength;
uniform float uRibDensity;
uniform float uIrregularity;
uniform float uGrainStrength;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

vec2 toAspect(vec2 uv) {
  vec2 p = uv;
  p.x *= uResolution.x / max(uResolution.y, 1.0);
  return p;
}

/**
 * Masque d'influence : large, asymétrique, étiré par la vélocité.
 * Aucun bord circulaire lisible.
 */
float influenceMask(vec2 uv, vec2 pointer, vec2 velocity) {
  vec2 p = toAspect(uv);
  vec2 c = toAspect(pointer);

  float vel = length(velocity);
  vec2 dir = vel > 1e-4 ? normalize(velocity) : vec2(0.0, 1.0);

  // Ellipse étirée dans le sens du mouvement (traînée)
  vec2 d = p - c;
  float stretch = 1.0 + vel * uTrailStretch * 4.0;
  float along = dot(d, dir);
  float across = dot(d, vec2(-dir.y, dir.x));
  float r2 = (along * along) / (stretch * stretch) + (across * across) * stretch;

  float radius = uInfluenceRadius * mix(1.0, 0.85, uIsMobile);
  float falloff = exp(-r2 / max(radius * radius * 1.8, 1e-4));
  // Soften encore pour casser le look “spot”
  falloff *= falloff;
  return falloff * mix(0.35, 1.0, uPointerActive) * mix(1.0, 0.2, uReducedMotion);
}

vec3 getBackground(vec2 uv) {
  float t = uTime * uIdleSpeed * mix(1.0, 0.04, uReducedMotion);

  vec2 p = toAspect(uv - 0.5);

  // Masses très diffuses — majorité noir bleuté
  vec2 topPetrol = vec2(0.08, 0.38) + vec2(sin(t * 0.11), cos(t * 0.09)) * 0.06;
  vec2 midTurquoise = vec2(0.28, 0.02) + vec2(cos(t * 0.08 + 1.2), sin(t * 0.1)) * 0.07;
  vec2 greenZone = vec2(-0.12, -0.15) + vec2(sin(t * 0.07 + 0.5), cos(t * 0.12)) * 0.05;
  vec2 deepPool = vec2(0.18, -0.32) + vec2(cos(t * 0.06), sin(t * 0.08 + 2.0)) * 0.04;

  float n = fbm(p * 1.1 + t * 0.05);
  p += (n - 0.5) * 0.06;

  float wTop = exp(-dot(p - topPetrol, p - topPetrol) * 1.8);
  float wMid = exp(-dot(p - midTurquoise, p - midTurquoise) * 2.2);
  float wGreen = exp(-dot(p - greenZone, p - greenZone) * 2.6);
  float wDeep = exp(-dot(p - deepPool, p - deepPool) * 1.5);

  // ~60–70 % deep / background, 20–30 % pétrole
  vec3 col = mix(uDeepBlack, uBackground, 0.55 + n * 0.12);
  col = mix(col, uDarkPetrol, wTop * 0.55);
  col = mix(col, uMediumPetrol, wMid * 0.42);
  col = mix(col, uGreenPetrol, wGreen * 0.32);
  col = mix(col, uDeepBlack, wDeep * 0.5);
  col = mix(col, uBackground, (1.0 - wTop - wMid) * 0.15);

  // Halo interactif — pétrole / vert, jamais un disque net
  float vel = length(uPointerVelocity);
  float influence = influenceMask(uv, uPointer, uPointerVelocity);
  vec3 haloCol = mix(uDarkPetrol, uGreenPetrol, 0.45 + clamp(vel * 2.5, 0.0, 0.4));
  haloCol = mix(haloCol, uMediumPetrol, clamp(vel * 1.8, 0.0, 0.5));
  // Éclairage local discret (pas un spot blanc)
  col = mix(col, mix(col, haloCol, 0.55), influence * (0.28 + clamp(vel * 0.9, 0.0, 0.35)));

  // Respiration très lente des zones hautes
  float breath = 0.5 + 0.5 * sin(t * 0.4 + uv.x * 2.0);
  col = mix(col, mix(col, uDarkPetrol, 0.2), breath * 0.04 * (1.0 - uReducedMotion));

  return col;
}

/**
 * Champ de rainures : arcs elliptiques issus du bas-gauche,
 * courbés vers le haut-droite — pas de bandes diagonales droites.
 */
void glassField(
  vec2 uv,
  float t,
  out vec2 refractionOffset,
  out float ribMask,
  out float ribEdge,
  out vec2 fakeNormal
) {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Origine hors écran, bas-gauche
  vec2 origin = vec2(-0.35 * aspect, -0.55);
  vec2 q = p - origin;

  // Espace elliptique → grands arcs
  vec2 ell = q * vec2(0.72, 1.15);
  float radius = length(ell);
  float angle = atan(ell.y, ell.x);

  // Distorsion organique + influence locale du pointeur
  float irr = uIrregularity;
  float warp = (fbm(vec2(angle * 1.4, radius * 0.55) + t * 0.06) - 0.5) * irr;
  radius += warp * 0.12;
  angle += (fbm(vec2(radius * 0.8, t * 0.05)) - 0.5) * irr * 0.15;

  float influence = influenceMask(uv, uPointer, uPointerVelocity);
  vec2 ptr = toAspect(uPointer);
  vec2 toward = normalize(ptr - toAspect(uv) + 1e-5);
  // Courbure locale vers le pointeur (faible, large)
  angle += toward.x * influence * uDistortionStrength * 18.0;
  radius += toward.y * influence * uDistortionStrength * 4.0;

  float density = uRibDensity * mix(1.0, 0.88, uIsMobile);
  // Plusieurs fréquences → largeurs / espacements irréguliers
  float ribs =
    sin(radius * density + angle * 0.35) * 0.52 +
    sin(radius * density * 0.47 + angle * 1.1 + 0.8) * 0.28 +
    sin(radius * density * 1.63 + fbm(vec2(angle, radius)) * 2.5) * 0.2;

  // Respiration optique très lente
  ribs += sin(radius * 2.2 + t * 0.25) * 0.04 * (1.0 - uReducedMotion);

  ribMask = smoothstep(-0.2, 0.55, ribs);
  // Creux presque noirs
  float trough = smoothstep(0.35, -0.25, ribs);

  float e = 0.004;
  float ribsR =
    sin((radius + e) * density + angle * 0.35) * 0.52 +
    sin((radius + e) * density * 0.47 + angle * 1.1 + 0.8) * 0.28;
  float ribsA =
    sin(radius * density + (angle + e) * 0.35) * 0.52 +
    sin(radius * density * 0.47 + (angle + e) * 1.1 + 0.8) * 0.28;
  float dR = ribsR - (sin(radius * density + angle * 0.35) * 0.52 + sin(radius * density * 0.47 + angle * 1.1 + 0.8) * 0.28);
  float dA = ribsA - (sin(radius * density + angle * 0.35) * 0.52 + sin(radius * density * 0.47 + angle * 1.1 + 0.8) * 0.28);

  // Normale dans le plan UV (approximation)
  vec2 radialDir = normalize(ell + 1e-5);
  vec2 tangentDir = vec2(-radialDir.y, radialDir.x);
  fakeNormal = normalize(radialDir * (dR / e) + tangentDir * (dA / e) * 0.65 + vec2(0.0, 0.2));

  ribEdge = smoothstep(0.05, 0.45, ribMask) * (1.0 - smoothstep(0.45, 0.92, ribMask));
  ribEdge *= mix(0.55, 1.0, influence);

  float vel = length(uPointerVelocity);
  float refractAmp = uRefractionStrength
    * mix(1.0, 0.7, uIsMobile)
    * (1.0 + influence * (0.5 + uVelocityInfluence * clamp(vel * 3.0, 0.0, 1.2)));

  // Compression / étirement le long de la courbe
  refractionOffset = fakeNormal * refractAmp * (0.35 + ribMask * 0.65);
  refractionOffset += tangentDir * trough * refractAmp * 0.35;
  refractionOffset *= mix(1.0, 0.15, uReducedMotion);
}

void main() {
  vec2 uv = vUv;
  float t = uTime * mix(1.0, 0.03, uReducedMotion);

  vec3 baseColor = getBackground(uv);

  vec2 refractionOffset;
  float ribMask;
  float ribEdge;
  vec2 fakeNormal;
  glassField(uv, t, refractionOffset, ribMask, ribEdge, fakeNormal);

  float vel = length(uPointerVelocity);
  float influence = influenceMask(uv, uPointer, uPointerVelocity);

  // Aberration adaptée : G / B, très peu de R
  float aberr = uAberrationStrength
    * mix(1.0, 0.5, uIsMobile)
    * (0.35 + ribEdge * 0.9)
    * (1.0 + clamp(vel * 2.5, 0.0, 1.0) * influence * 0.8)
    * mix(1.0, 0.1, uReducedMotion);

  vec2 dir = normalize(fakeNormal + 1e-5);
  vec2 offG = refractionOffset + dir * aberr;
  vec2 offB = refractionOffset - dir * aberr;
  vec2 offR = refractionOffset * 0.35;

  vec3 refracted = vec3(
    getBackground(uv + offR).r,
    getBackground(uv + offG).g,
    getBackground(uv + offB).b
  );

  // Mélange fond / réfraction — creux assombris
  float trough = 1.0 - ribMask;
  vec3 glass = mix(baseColor, refracted, 0.55 + ribMask * 0.25 + influence * 0.08);
  glass = mix(glass, uDeepBlack, trough * 0.42);
  glass = mix(glass, mix(glass, uGreenPetrol, 0.25), ribMask * 0.12);

  // Teinte différente des deux côtés d'une rainure
  float side = clamp(fakeNormal.x * 0.5 + 0.5, 0.0, 1.0);
  glass = mix(glass, mix(glass, uDarkPetrol, 0.2), side * ribEdge * 0.35);
  glass = mix(glass, mix(glass, uGreenPetrol, 0.18), (1.0 - side) * ribEdge * 0.3);

  // Reflets fins, interrompus, plus présents en haut
  float topBias = smoothstep(0.15, 0.85, uv.y);
  float breakNoise = smoothstep(0.35, 0.65, fbm(uv * 6.0 + t * 0.08));
  float shimmer = 0.5 + 0.5 * sin(t * 0.22 + uv.x * 5.0 + fakeNormal.x * 3.0);
  float highlight =
    ribEdge
    * uHighlightStrength
    * topBias
    * breakNoise
    * (0.55 + shimmer * 0.45)
    * (1.0 + influence * (0.4 + clamp(vel * 2.0, 0.0, 0.8)));

  glass += uSoftReflection * highlight * 0.22;
  glass += uBrightReflection * highlight * 0.1;
  glass += uMediumPetrol * highlight * 0.12;
  glass += uGreenPetrol * ribEdge * topBias * 0.04 * shimmer;

  vec3 color = mix(baseColor, glass, clamp(0.75 + ribMask * 0.2, 0.0, 1.0));

  // Assurer la profondeur dominante (éviter turquoise uniforme)
  color = mix(color, uBackground, 0.12);
  color = mix(color, uDeepBlack, trough * 0.15);

  float grainAmt = uGrainStrength * mix(1.0, 0.55, uIsMobile) * mix(1.0, 0.15, uReducedMotion);
  float grain = (hash(uv * uResolution.xy + fract(uTime * 0.02) * 30.0) - 0.5) * grainAmt;
  color += grain;

  gl_FragColor = vec4(color, 1.0);
}
`;
