
export const getMediaUrl = (publicId: string, type: 'image' | 'video' = 'image') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dbt0ogxdx';

  // Strip file extension if present
  const cleanPublicId = publicId.replace(/\.(png|jpg|jpeg|mp4|mov|webp|svg|gif)$/i, '');

  return `https://res.cloudinary.com/${cloudName}/${type}/upload/f_auto,q_auto/${cleanPublicId}`;
};
