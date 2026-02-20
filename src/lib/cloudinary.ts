export const getMediaUrl = (publicId: string, type: 'image' | 'video' = 'image') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn('VITE_CLOUDINARY_CLOUD_NAME is not set');
    return ''; // Or a default placeholder
  }

  // Remove file extension if present to prevent double extensions with f_auto
  const cleanId = publicId.replace(/\.[^/.]+$/, "");

  return `https://res.cloudinary.com/${cloudName}/${type}/upload/f_auto,q_auto/${cleanId}`;
};
