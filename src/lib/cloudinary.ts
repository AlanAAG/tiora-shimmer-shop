export const getMediaUrl = (publicId: string, type: 'image' | 'video' = 'image') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn('VITE_CLOUDINARY_CLOUD_NAME is not set');
    return ''; // Or a default placeholder
  }

  // Check if extension is present
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(publicId);
  let finalPublicId = publicId;

  if (!hasExtension) {
    if (type === 'image') {
      finalPublicId = `${publicId}.jpg`;
    } else if (type === 'video') {
      finalPublicId = `${publicId}.mp4`;
    }
  }

  const finalUrl = `https://res.cloudinary.com/${cloudName}/${type}/upload/f_auto,q_auto/${finalPublicId}`;

  console.log(`[Cloudinary Debug] URL Generated: ${finalUrl}`);

  return finalUrl;
};
