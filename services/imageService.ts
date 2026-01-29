import { ResizedImage, PlatformSize } from '../types';
import Pica from 'pica';

// Initialize Pica with default settings
const pica = new Pica();

export const resizeImage = (
  file: File,
  sizes: PlatformSize[]
): Promise<ResizedImage[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        try {
            // 1. Calculate the square crop area from the center
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;

            // 2. Create a temporary canvas for the full-resolution square crop
            const cropCanvas = document.createElement('canvas');
            cropCanvas.width = minDim;
            cropCanvas.height = minDim;
            const cropCtx = cropCanvas.getContext('2d');
            
            if (!cropCtx) {
              reject(new Error("Could not get context"));
              return;
            }

            // Draw the cropped source image
            cropCtx.drawImage(img, sx, sy, minDim, minDim, 0, 0, minDim, minDim);

            // 3. Process each size using Pica (Lanczos3 + Unsharp Mask)
            const tasks = sizes.map(async ({ platform, size }) => {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;

                // Resize with high quality options
                // unsharpAmount: 0..500 (Default 0). Around 60-100 is usually good for emotes to keep them crisp.
                await pica.resize(cropCanvas, canvas, {
                    unsharpAmount: 100, // Significant sharpening to counteract downscaling blur
                    unsharpRadius: 0.6,
                    unsharpThreshold: 2
                });

                const dataUrl = canvas.toDataURL('image/png');
                
                // Convert to Blob
                const blob = await pica.toBlob(canvas, 'image/png');
                
                return {
                    platform,
                    size,
                    dataUrl,
                    blob
                } as ResizedImage;
            });

            // Wait for all resizing tasks
            const results = await Promise.all(tasks);

            // Sort by platform then size (descending)
            results.sort((a, b) => {
              if (a.platform !== b.platform) return a.platform.localeCompare(b.platform);
              return b.size - a.size;
            });

            resolve(results);

        } catch (err) {
            reject(err);
        }
      };
      img.onerror = (err) => reject(err);
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};