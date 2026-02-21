
export const getMediaUrl = (publicId: string, type: 'image' | 'video' = 'image') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn('VITE_CLOUDINARY_CLOUD_NAME is not set');
    return ''; // Or a default placeholder
  }

  // Strip file extension if present
  const cleanPublicId = publicId.replace(/\.(png|jpg|jpeg|mp4|mov|webp|svg|gif)$/i, '');

  return `https://res.cloudinary.com/${cloudName}/${type}/upload/f_auto,q_auto/${cleanPublicId}`;
};
