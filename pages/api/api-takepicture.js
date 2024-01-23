// pages/api/api-takepicture.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageDataUrl } = req.body;

    // Obtenez le contenu de l'image en tant que buffer
    const imageBuffer = Buffer.from(imageDataUrl.split('base64,')[1], 'base64');

    // Créez un chemin d'enregistrement unique pour l'image
    const imageFileName = `captured-image-${Date.now()}.jpg`;
    const imagePath = path.join(process.cwd(), 'public', 'images', imageFileName);

    try {
      // Enregistrez l'image dans le dossier "images"
      fs.writeFileSync(imagePath, imageBuffer);
      res.status(200).json({ message: 'Image enregistrée avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'image.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}
