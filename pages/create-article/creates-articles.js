// pages/create-article.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import ArticleForm from '../../components/articleform';

const CreateArticlePage = () => {
  return (
    <Layout>
        <Head>
        <title>Créer un nouvel article</title>
       </Head>
    
      <ArticleForm />
    
    </Layout>
  );
};

export default CreateArticlePage;

