
export const getMediaUrl = (publicId: string, type: 'image' | 'video' = 'image') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn('VITE_CLOUDINARY_CLOUD_NAME is not set');
    return ''; // Or a default placeholder
  }
  return `https://res.cloudinary.com/${cloudName}/${type}/upload/f_auto,q_auto/${publicId}`;
};
