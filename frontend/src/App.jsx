import { useState, useEffect } from 'react';
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls , Grid } from "@react-three/drei";


function FramePlane({ frame , currentFrame }) {
  const texture = useLoader(
    THREE.TextureLoader,
    `/frames/frame_${String(frame).padStart(4, "0")}.jpg`
  );
  return (
    <mesh key={frame} position={[0, 0, ( currentFrame - frame ) * 0.15]}>
      <planeGeometry args={[4, 7.59]} />

      <meshBasicMaterial color='white' map={texture} side = {THREE.DoubleSide} />

    </mesh>
  );

}

function App() {

  const [frameCount, setFrameCount] = useState(132);

  const [currentFrame, setCurrentFrame] = useState(0);
  
  const [isPlaying, setIsPlaying] = useState(false);

  const frames = Array.from({ length: frameCount }, (_, i) => i);

  useEffect(() => {
    if(!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev >= 131 ? 0 : prev +1));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);


  return (
    <div>

      <label>
        Frames displayed: {frameCount}
      </label>


      <input
        type="range"
        min="1"
        max="132"
        value={frameCount}
        onChange={(e) => setFrameCount(Number(e.target.value))}
      />

      <label>
        Current Frame: {currentFrame} / 131
      </label>

      <input
        type="range"
        min="0"
        max="131"
        value={currentFrame}
        onChange={(e) => setCurrentFrame(Number(e.target.value))}
      />

      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <Canvas camera={{ position: [0, 0, 10] }}>

        <color attach="background" args={["#101114"]} />

<Grid
  position={[0, -4, 0]}
  args={[200, 200]}
  cellSize={1}
  cellThickness={0.6}
  cellColor="#383b40"
  sectionSize={5}
  sectionThickness={1}
  sectionColor="#555960"
  fadeDistance={80}
  fadeStrength={1}
  infiniteGrid
/>
{/* Red X axis */}
<mesh position={[0, -3.98, 0]} rotation={[0, 0, 0]}>
  <boxGeometry args={[200, 0.015, 0.015]} />
  <meshBasicMaterial color="#8f343b" />
</mesh>

{/* Green Z axis */}
<mesh position={[0, -3.98, 0]} rotation={[0, 0, 0]}>
  <boxGeometry args={[0.015, 0.015, 200]} />
  <meshBasicMaterial color="#477b50" />
</mesh>

        {frames.map((frame) => (
          <FramePlane key={frame} frame={frame} currentFrame={currentFrame} />
        ))}


        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
        />



      </Canvas>

      
    </div>
  );
}

export default App
