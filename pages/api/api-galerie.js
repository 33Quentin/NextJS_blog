import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images');

    try {
      // Lire tous les fichiers du dossier "images"
      const imageFiles = fs.readdirSync(imagesDirectory);

      // Filtrer les fichiers pour ne conserver que les fichiers avec une extension jpg
      const jpgFiles = imageFiles.filter((file) => file.toLowerCase().endsWith('.jpg'));

      // Envoyer la liste des noms de fichiers en réponse
      res.status(200).json({ images: jpgFiles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des noms de fichiers.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}
