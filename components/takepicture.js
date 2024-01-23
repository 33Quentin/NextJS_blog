// components/TakePicture.js
import { useState } from 'react';

const TakePicture = ({ onPictureTaken }) => {
  const [stream, setStream] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [author, setAuthor] = useState("");

  const handleCapturePhoto = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);


      const video = document.createElement('video');
      video.srcObject = mediaStream;
      video.play();

      video.addEventListener('loadeddata', async () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setImageSrc(imageDataUrl);

        // Appeler la fonction fournie pour envoyer l'image à la page parente
        onPictureTaken(imageDataUrl);

        // Envoyer l'image côté serveur avec l'api takepicture
        await fetch('https://localhost:3000/api/api-takepicture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageDataUrl }),
        });
        

        // Arrêter la vidéo et le streaming
        video.pause();
        mediaStream.getTracks().forEach(track => track.stop());
        setStream(null);

      });
    } catch (error) {
      console.error('Erreur lors de la capture de la photo:', error);
      setAuthor(error)
      
    }
  };

  return (
    <div>
        {JSON.stringify(author)}
      <button onClick={handleCapturePhoto}>Prendre une photo</button>
      {imageSrc && <img src={imageSrc} alt="Captured" style={{ maxWidth: '100%', marginTop: '10px' }} />}
    </div>
  );
};

export default TakePicture;
