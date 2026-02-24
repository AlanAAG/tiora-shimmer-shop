
export const getMediaUrl = (publicId: string, resourceType: 'image' | 'video' = 'image') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dbt0ogxdx';

  // Strip file extension if present (e.g., .mp4, .jpg)
  const cleanPublicId = publicId.replace(/\.(png|jpg|jpeg|mp4|mov|webp|svg|gif)$/i, '');

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/f_auto,q_auto/${cleanPublicId}`;
};

export const getVideoPoster = (publicId: string) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dbt0ogxdx';

  // Strip file extension if present
  const cleanPublicId = publicId.replace(/\.(png|jpg|jpeg|mp4|mov|webp|svg|gif)$/i, '');

  // For video thumbnails, we use resource_type 'video' but format 'jpg'
  // Note: We don't use f_auto here because we specifically want an image format (jpg) from a video source.
  // However, Cloudinary supports f_auto on video resources to deliver image formats too.
  // But typically for posters, explicit format like .jpg is safer if f_auto might return webp/avif
  // which <video poster="..."> might not like in some older browsers (though modern ones are fine).
  // The user requirement says: "For a video ID, it should change the extension to .jpg and the resource type to /video/upload/"
  // It also says "always output a URL with f_auto and q_auto".
  // So: /video/upload/f_auto,q_auto/cleanPublicId.jpg

  return `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${cleanPublicId}.jpg`;
};
