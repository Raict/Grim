interface ICOHeader {
  reserved: number;
  type: number;
  count: number;
}

interface ICODirEntry {
  width: number;
  height: number;
  colorCount: number;
  reserved: number;
  planes: number;
  bitCount: number;
  bytesInRes: number;
  imageOffset: number;
}

export async function createIcoFile(canvasElements: HTMLCanvasElement[]): Promise<Blob> {
  // Sort canvases by size (smallest first)
  const sortedCanvases = canvasElements.sort((a, b) => a.width - b.width);

  const pngBuffers: Uint8Array[] = [];
  const dirEntries: ICODirEntry[] = [];

  // Convert each canvas to PNG
  for (const canvas of sortedCanvases) {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png');
    });

    const arrayBuffer = await blob.arrayBuffer();
    const pngBuffer = new Uint8Array(arrayBuffer);
    pngBuffers.push(pngBuffer);
  }

  // Calculate file structure
  const headerSize = 6; // ICO header
  const dirEntrySize = 16; // Each directory entry
  const dirSize = headerSize + (dirEntries.length * dirEntrySize);

  let currentOffset = headerSize + (sortedCanvases.length * dirEntrySize);

  // Create directory entries
  for (let i = 0; i < sortedCanvases.length; i++) {
    const canvas = sortedCanvases[i];
    const pngBuffer = pngBuffers[i];

    dirEntries.push({
      width: canvas.width === 256 ? 0 : canvas.width,  // 256px is stored as 0
      height: canvas.height === 256 ? 0 : canvas.height,
      colorCount: 0, // 0 for PNG
      reserved: 0,
      planes: 1,
      bitCount: 32, // 32-bit PNG
      bytesInRes: pngBuffer.length,
      imageOffset: currentOffset
    });

    currentOffset += pngBuffer.length;
  }

  // Calculate total file size
  const totalSize = headerSize + (dirEntries.length * dirEntrySize) +
                   pngBuffers.reduce((sum, buf) => sum + buf.length, 0);

  // Create the ICO file buffer
  const icoBuffer = new Uint8Array(totalSize);
  let offset = 0;

  // Write ICO header
  const header = new DataView(icoBuffer.buffer);
  header.setUint16(0, 0, true); // Reserved (always 0)
  header.setUint16(2, 1, true); // Type (1 for ICO)
  header.setUint16(4, sortedCanvases.length, true); // Number of images
  offset = 6;

  // Write directory entries
  for (const entry of dirEntries) {
    const entryView = new DataView(icoBuffer.buffer, offset);
    entryView.setUint8(0, entry.width);
    entryView.setUint8(1, entry.height);
    entryView.setUint8(2, entry.colorCount);
    entryView.setUint8(3, entry.reserved);
    entryView.setUint16(4, entry.planes, true);
    entryView.setUint16(6, entry.bitCount, true);
    entryView.setUint32(8, entry.bytesInRes, true);
    entryView.setUint32(12, entry.imageOffset, true);
    offset += 16;
  }

  // Write PNG data
  for (const pngBuffer of pngBuffers) {
    icoBuffer.set(pngBuffer, offset);
    offset += pngBuffer.length;
  }

  return new Blob([icoBuffer], { type: 'image/x-icon' });
}

export async function createIcoFromSizes(
  imageBlob: Blob | HTMLCanvasElement,
  sizes: number[] = [16, 32, 48]
): Promise<Blob> {
  const canvases: HTMLCanvasElement[] = [];

  for (const size of sizes) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = size;
    canvas.height = size;

    if (imageBlob instanceof HTMLCanvasElement) {
      // If it's already a canvas, just draw it
      ctx.drawImage(imageBlob, 0, 0, size, size);
    } else {
      // If it's a blob, create image and draw
      const img = await new Promise<HTMLImageElement>((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = URL.createObjectURL(imageBlob);
      });

      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(img.src);
    }

    canvases.push(canvas);
  }

  return await createIcoFile(canvases);
}