// pages/galerie.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import TakePicture from '../../components/takepicture'; 
import styles from './galerie.module.css';

export default function Galerie({ images }) {
  const [capturedImage, setCapturedImage] = useState(null);

  const handlePictureTaken = (imageDataUrl) => {
    setCapturedImage(imageDataUrl);
  };

  return (
    <Layout>
      <Head>
        <title>Galerie</title>
      </Head>
      
      <h1>Ajouter une photo</h1>

      {/* Bouton pour prendre la photo */}
      <TakePicture onPictureTaken={handlePictureTaken} />
      

      <h1>Photo</h1>

      {/* Afficher la photo capturée */}
      {capturedImage && (
        <div>
          <h2>Photo capturée :</h2>
          <img src={capturedImage} alt="Captured" className={styles.capturedPhoto} />
        </div>
      )}

      <h2>Photos existantes :</h2>
      <div className={styles.photoGrid}>
        {images.map((image, index) => (
          <img
            key={index}
            src={`/images/${image}`}
            alt={`Photo ${index + 1}`}
            className={styles.photo}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Récupérer la liste des noms de fichiers depuis l'API galerie
  const response = await fetch('https://localhost:3000/api/api-galerie');
  const { images } = await response.json();

  // Passer les noms de fichiers en tant que propriété à la page
  return {
    props: {
      images,
    },
  };
}
