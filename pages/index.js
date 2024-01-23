import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}



export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Bienvenue à tous, admirateurs des félins ! 🐾🐱
        <br />
        <br />
        Mesdames et Messieurs, laissez-moi vous présenter une véritable boule de douceur, un félin d'une beauté éclatante et d'une gentillesse inégalée : Koda !
        <br />
        Nom: Koda
        <br />
        Race: Chat Blanc Adorable
        <br />
        Âge: Un an de pur bonheur
        <br />
        Traits distinctifs: Son pelage immaculé et ses yeux perçants, dignes d'un conte de fées.
        <br />
        <br />
        Koda, le petit roi de la maison, règne en maître avec sa fourrure blanche aussi douce que la neige. Sa présence apporte une aura de calme et de sérénité à tous ceux qui ont le privilège de le côtoyer.

        D'un an seulement, Koda est à la fois joueur et câlin. Ses escapades ludiques dans la maison sont tout simplement irrésistibles, et ses moments de tendresse vous feront fondre. Il a la capacité de transformer n'importe quel jour morose en une aventure joyeuse.

        Les yeux de Koda, d'un bleu cristallin, reflètent une intelligence et une curiosité sans limite. Il observe le monde qui l'entoure avec une fascination touchante, et chaque coin de la maison devient une découverte passionnante pour lui.

        Koda est bien plus qu'un simple chat, il est un compagnon fidèle, un confident silencieux et le rayon de soleil qui illumine nos journées. Il ne manquera pas de vous charmer avec ses miaulements mélodieux et ses ronronnements apaisants.

        En somme, Koda est bien plus qu'un chat blanc, il est une source infinie de bonheur et d'amour. Adopter Koda, c'est inviter dans votre vie une boule de poils irrésistible qui saura égayer chacun de vos instants.</p>
        
      </section>

      <Link href="/galerie/galerie">
          <button>Galerie photo</button>
          </Link>


      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
            </li>
          ))}
        </ul>
        
          <Link href="/create-article/creates-articles">
          <button>Ajoute un article</button>
          </Link>
        
      </section>
    </Layout>
  );
}