
interface MediaOptions {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string | number;
  format?: string;
}

export const getMediaUrl = (publicId: string, type: 'image' | 'video' = 'image', options: MediaOptions = {}) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dbt0ogxdx';

  // Strip file extension if present
  const cleanPublicId = publicId.replace(/\.(png|jpg|jpeg|mp4|mov|webp|svg|gif)$/i, '');

  const parts = [];

  // Format
  if (options.format) {
    parts.push(`f_${options.format}`);
  } else {
    parts.push('f_auto');
  }

  // Quality
  if (options.quality) {
    parts.push(`q_${options.quality}`);
  } else {
    parts.push('q_auto');
  }

  // Dimensions
  if (options.width) parts.push(`w_${options.width}`);
  if (options.height) parts.push(`h_${options.height}`);
  if (options.crop) parts.push(`c_${options.crop}`);

  const transformationString = parts.join(',');

  return `https://res.cloudinary.com/${cloudName}/${type}/upload/${transformationString}/${cleanPublicId}`;
};
