/**
 * imageProcessor.js
 * Funciones de muestreo y cuantización de imágenes mediante Canvas API.
 *
 * sampleAndQuantize:
 *   Toma el canvas original, lo reduce al tamaño `targetRes`×`targetRes`
 *   (muestreo espacial), aplica cuantización de `bitDepth` bits por canal
 *   y escala el resultado de vuelta al tamaño original sin suavizado.
 */
export function sampleAndQuantize(origCanvas, outCanvas, targetRes, bitDepth) {
  const ow = origCanvas.width;
  const oh = origCanvas.height;

  // 1) Muestreo espacial: reducir a targetRes x targetRes
  const tmp = document.createElement('canvas');
  tmp.width = targetRes;
  tmp.height = targetRes;
  const tctx = tmp.getContext('2d');
  tctx.drawImage(origCanvas, 0, 0, targetRes, targetRes);

  // 2) Cuantización: reducir niveles de color por canal
  const imgData = tctx.getImageData(0, 0, targetRes, targetRes);
  const data = imgData.data;
  const levels = Math.pow(2, bitDepth);
  const step = 255 / (levels - 1);

  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      // Mapear al nivel de cuantización más cercano
      data[i + c] = Math.round(Math.floor((data[i + c] / 255) * (levels - 1)) * step);
    }
    // Canal alfa intacto
  }
  tctx.putImageData(imgData, 0, 0);

  // 3) Escalar de vuelta al tamaño original sin interpolación (pixelado intencional)
  outCanvas.width = ow;
  outCanvas.height = oh;
  const octx = outCanvas.getContext('2d');
  octx.imageSmoothingEnabled = false;
  octx.drawImage(tmp, 0, 0, ow, oh);
}

/**
 * getImageStats: devuelve tamaño estimado original y procesado.
 * La estimación del tamaño sin comprimir considera bits por canal × canales × píxeles.
 */
export function getImageStats(origCanvas, targetRes, bitDepth, compression) {
  const origPixels = origCanvas.width * origCanvas.height;
  const origSize = origPixels * 3; // 24 bits por píxel = 3 bytes

  // Tamaño del área muestreada (targetRes²) con bitDepth bits por canal
  const sampledPixels = targetRes * targetRes;
  const bitsPerPixel = bitDepth * 3;
  const rawSampledBytes = (sampledPixels * bitsPerPixel) / 8;

  // Estimación con compresión JPEG aplicada
  const compressedBytes = Math.round(rawSampledBytes * compression * 0.12);

  return {
    originalSize: origSize,
    processedSize: compressedBytes,
    reduction: origSize > 0 ? Math.round((1 - compressedBytes / origSize) * 100) : 0,
  };
}
