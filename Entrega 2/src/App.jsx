// src/App.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import "../style.css";
import logo from "../logo.png";
import { sampleAndQuantize, getImageStats } from "./imageProcessor";

export default function App() {
  const [file, setFile] = useState(null);
  const [resolution, setResolution] = useState(500);
  const [bitDepth, setBitDepth] = useState(8);
  const [compression, setCompression] = useState(0.8);
  const [stats, setStats] = useState(null);

  const origRef = useRef(null);
  const transRef = useRef(null);

  // Procesar imagen cada vez que cambian los parámetros
  const processImage = useCallback(() => {
    const origCanvas = origRef.current;
    const outCanvas = transRef.current;
    if (!origCanvas || !outCanvas || origCanvas.width === 0) return;

    sampleAndQuantize(origCanvas, outCanvas, resolution, bitDepth);

    const s = getImageStats(origCanvas, resolution, bitDepth, compression);
    setStats(s);
  }, [resolution, bitDepth, compression]);

  // Cargar imagen en canvas original
  useEffect(() => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const c = origRef.current;
      c.width = img.width;
      c.height = img.height;
      c.getContext("2d").drawImage(img, 0, 0);
      processImage();
    };
    img.src = URL.createObjectURL(file);
  }, [file]);

  // Re-procesar ante cambios de parámetros (sin recargar la imagen)
  useEffect(() => {
    if (file) processImage();
  }, [resolution, bitDepth, compression]);

  const handleDownload = () => {
    const url = transRef.current.toDataURL("image/jpeg", compression);
    const a = document.createElement("a");
    a.href = url;
    a.download = "digitalizada.jpg";
    a.click();
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="container">
      <header className="app-header">
        <img src={logo} alt="Logo UTN" className="header-logo" />
        <h1>Digitalizador de Imágenes</h1>
      </header>

      <div className="main">
        {/* Zona de carga + controles */}
        <div className="top-section">
          <div className="preview-area">
            <label className="upload-area">
              Cargar Imagen ⬆️
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          <div className="sliders">
            {/* Resolución */}
            <div className="slider-group">
              <label>
                Resolución: <strong>{resolution}×{resolution}</strong>
              </label>
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={resolution}
                onChange={(e) => setResolution(+e.target.value)}
              />
            </div>

            {/* Profundidad de bits */}
            <div className="slider-group">
              <label>
                Profundidad de bits: <strong>{bitDepth} bit{bitDepth > 1 ? "s" : ""}</strong>
                {" "}({Math.pow(2, bitDepth)} niveles)
              </label>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={bitDepth}
                onChange={(e) => setBitDepth(+e.target.value)}
              />
            </div>

            {/* Compresión JPEG */}
            <div className="slider-group">
              <label>
                Compresión JPEG: <strong>{Math.round(compression * 100)}%</strong>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={compression}
                onChange={(e) => setCompression(+e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Comparativa de imágenes */}
        <div className="canvas-section">
          <div className="canvas-container">
            <canvas ref={origRef}></canvas>
            <p>Original</p>
          </div>
          <div className="canvas-container">
            <canvas ref={transRef}></canvas>
            <p>Transformada</p>
          </div>
        </div>

        <button
          className="download-button"
          onClick={handleDownload}
          disabled={!file}
        >
          Descargar Imagen
        </button>
      </div>

      <footer className="app-footer">
        Integrantes: Traversa Facundo · Usatorre Tomás · Santillán Lucas · Nosetti María Constanza
      </footer>
    </div>
  );
}
