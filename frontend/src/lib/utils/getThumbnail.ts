export const getVideoThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);

    video.src = url;
    video.currentTime = 1; // seek to 1s for a frame

    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/png");
        URL.revokeObjectURL(url); // cleanup
        resolve(imageUrl);
      } else {
        reject("Canvas context not available");
      }
    };

    video.onerror = reject;
  });
};
