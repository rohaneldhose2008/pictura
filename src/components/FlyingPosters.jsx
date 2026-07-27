import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Texture, Program, Mesh, Plane } from 'ogl';
import './FlyingPosters.css';

export default function FlyingPosters({
  items = [],
  planeWidth = 400,
  planeHeight = 400,
  distortion = 1.5
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !items.length) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const renderer = new Renderer({ alpha: true, antialias: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 5;

    const scene = new Transform();
    const geometry = new Plane(gl, { width: 3.2, height: 3.2, widthSegments: 20, heightSegments: 20 });

    const texture = new Texture(gl);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = items[0];
    img.onload = () => {
      texture.image = img;
    };

    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 2.0 + uTime) * 0.15;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uTime: { value: 0 }
      },
      transparent: true
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let animationId;
    let time = 0;
    const render = () => {
      time += 0.02;
      program.uniforms.uTime.value = time;
      renderer.render({ scene, camera });
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      if (gl.canvas && gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
    };
  }, [items]);

  return <div ref={containerRef} className="flying-posters-canvas" />;
}
