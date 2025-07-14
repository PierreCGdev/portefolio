"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CubeGridCanvas() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    const camera = new THREE.PerspectiveCamera(
      30,
      windowWidth / windowHeight,
      0.1,
      100
    );
    camera.position.set(0, 40, 0);
    camera.lookAt(0, 0, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(windowWidth, windowHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0, 10, -10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(248, 248);
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 1000;
    const d = 50;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    scene.add(directionalLight);

    // GRID
    const gridSizeX = Math.round(windowWidth / 150);
    const gridSizeZ = Math.round(windowHeight / 150);
    const cubeSpacing = 1.5;
    const cubeSize = 1.5;

    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const baseColor = new THREE.Color(0x303030);
    const hoverColor = new THREE.Color(0x828282);

    const material = new THREE.MeshStandardMaterial({ color: baseColor });
    const cubes = [];

    for (let x = 0; x < gridSizeX; x++) {
      for (let z = 0; z < gridSizeZ; z++) {
        const cube = new THREE.Mesh(geometry, material.clone());
        cube.position.x = (x - (gridSizeX - 1) / 2) * cubeSpacing;
        cube.position.z = (z - (gridSizeZ - 1) / 2) * cubeSpacing;
        cube.userData.baseY = cube.position.y;
        cube.userData.baseRX = cube.rotation.x;
        cube.castShadow = true;
        cube.receiveShadow = true;
        cubes.push(cube);
        scene.add(cube);
      }
    }

    // RAYCASTING
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredCube = null;

    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener("mousemove", onMouseMove);

    // ANIMATION
    function animate() {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);
      hoveredCube = intersects.length > 0 ? intersects[0].object : null;

      cubes.forEach((cube) => {
        let targetY = cube.userData.baseY;
        let targetRX = cube.userData.baseRX;
        let hoverFactor = 0;

        if (hoveredCube) {
          const dx = cube.position.x - hoveredCube.position.x;
          const dz = cube.position.z - hoveredCube.position.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          const falloff = 2;
          hoverFactor = Math.exp(-dist / falloff);

          targetY += 1 * hoverFactor;
          targetRX += 1.7 * hoverFactor;
        }

        cube.position.y += (targetY - cube.position.y) * 0.06;
        cube.rotation.x += (targetRX - cube.rotation.x) * 0.06;
        cube.material.color.copy(baseColor).lerp(hoverColor, hoverFactor);
      });

      renderer.render(scene, camera);
    }
    animate();

    // RESPONSIVE
    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener("resize", onResize);

    // CLEANUP
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-[-1]" />;
}
