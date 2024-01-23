// components/ArticleForm.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from './layout'; 
import styles from './articleform.module.css'; 

const ArticleForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  useEffect(()=> { console.log("ça se monte"); return ()=>{console.log("demonter")}}, []
  )

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoyer les données au serveur pour la création d'article
    const response = await fetch('http://localhost:3000/api/api-creates-articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      // Rediriger après la création réussie
      router.push('/');
    } else {
      console.error('Erreur lors de la création de l\'article');
    }
  };

  return (

      <div>
        {console.log("test console")}
        <h1>Créer un nouvel article</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Titre:
            <br />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} 
            className={styles['article-form-input']}
            style={{ width: '100%', maxWidth: '100%', resize: 'both' }}/>
          </label>
          <br />
          <br />
          <label>
            Contenu:
            <br />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10}
            className={styles['article-form-textarea']}
            style={{ width: '100%', maxWidth: '100%', resize: 'both' }} />
          </label>
          <br />
          <button type="submit">Créer l'article</button>
        </form>
      </div>
  );
};

export default ArticleForm;
