// pages/api/create-article.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    // Créer le contenu du fichier Markdown avec les métadonnées
    const articleContent = `---\ntitle: '${title}'\ndate: '${new Date().toISOString().split('T')[0]}'\n---\n\n${content}`;

    // Créer un nouveau fichier Markdown dans le répertoire approprié
    const filePath = path.join(process.cwd(), 'posts', `${title.toLowerCase().replace(/\s+/g, '-')}.md`);

    try {
      fs.writeFileSync(filePath, articleContent);
      res.status(200).json({ message: 'Article créé avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création de l\'article.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée.' });
  }
}
