const generateVideoThumbnail = (src: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const video = document.createElement('video');

    // this is important
    video.autoplay = true;
    video.muted = true;
    video.crossOrigin = 'anonymous';
    video.src = src;

    video.onloadeddata = () => {
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (!ctx) {
        return reject(
          new Error('[THUMBNAIL_GENERATOR]: Could not create canvas context')
        );
      }

      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      video.pause();
      return resolve(canvas.toDataURL('image/jpeg'));
    };
  });

export default generateVideoThumbnail;
