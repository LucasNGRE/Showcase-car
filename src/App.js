/* eslint-disable */

import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { useState, useRef } from 'react';
import { Menu } from 'lucide-react'; // Importer l'icône Menu de Lucide React

function Model(props) {
  const { scene } = useGLTF('/bmw.glb');
  return <primitive object={scene} {...props} />;
}

function App() {
  const [scale, setScale] = useState(0.01); // Échelle initiale de la voiture
  const [showMenu, setShowMenu] = useState(true); // État pour afficher ou masquer le menu
  const canvasRef = useRef(null);

  // Gérer le zoom avec la molette de la souris
  const handleWheel = (event) => {
    // Vérifier la direction de la molette
    const zoomFactor = event.deltaY < 0 ? 0.002 : -0.002; // Zoom avant si molette vers le haut, arrière si vers le bas
    setScale((prev) => Math.min(Math.max(prev + zoomFactor, 0.005), 0.05)); // Limiter l'échelle
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Canvas 3D */}
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{ position: 'absolute' }}
        onWheel={handleWheel} // Ajouter l'événement de la molette
      >
        <color attach="background" args={['#101010']} />
        <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
          <Stage environment={null}>
            <Model scale={scale} />
          </Stage>
        </PresentationControls>
      </Canvas>

      {/* Menu de présentation */}
      {showMenu && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            borderRadius: '10px',
            maxWidth: '300px',
          }}
        >
          <h1>BMW Showcase</h1>
          <p>
            Découvrez notre nouveau modèle BMW, conçu avec précision et élégance pour offrir une expérience
            de conduite exceptionnelle.
          </p>
          <button
            onClick={() => setShowMenu(false)} // Fermer le menu
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              background: '#007BFF',
              border: 'none',
              color: 'white',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Fermer
          </button>
        </div>
      )}

      {/* Icône de menu (hamburger) pour ouvrir le menu */}
      {!showMenu && (
        <Menu
          onClick={() => setShowMenu(true)} // Ouvrir le menu en cliquant sur l'icône
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontSize: '40px',
            color: 'white',
            cursor: 'pointer',
          }}
        />
      )}

      {/* Contrôles de zoom */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          display: 'flex',
          gap: '10px',
        }}
      >
        <button
          onClick={() => setScale((prev) => Math.min(Math.max(prev + 0.002, 0.005), 0.05))}
          style={{
            padding: '10px 20px',
            background: '#007BFF',
            border: 'none',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Zoom +
        </button>
        <button
          onClick={() => setScale((prev) => Math.min(Math.max(prev - 0.002, 0.005), 0.05))}
          style={{
            padding: '10px 20px',
            background: '#007BFF',
            border: 'none',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Zoom -
        </button>
      </div>
    </div>
  );
}

export default App;
