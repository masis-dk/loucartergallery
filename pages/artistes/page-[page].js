import React, { Fragment, useState } from 'react';
import MainComponent                 from '../../Components/Main/Main';
import ArtistesList                  from '../../Components/Artistes/ArtistesList';
import Prismic                       from 'prismic-javascript';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
import Head      from 'next/head';

const Artistes = ({ artistes, artiste, maxPage, query }) => {

  const [ page, incrementPage ] = useState(1);
  const nextPage = () => {
    if (page >= maxPage) return;
    incrementPage(page + 1);
  };
  const prevPage = () => {
    if (page <= 1) return;
    incrementPage(page - 1);
  };

  return (
    <Fragment>
      <Head>
        <title>{ artistes.data.title[ 0 ].text }</title>
        <meta property="og:url" content="https://loucartergallery.com/artistes"/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content={ artistes.data.description_google[ 0 ].text }/>
        <meta
          property="og:image:secure_url"
          content={ artistes.data.og_image.url }
        />
        <meta
          property="og:image"
          content={ artistes.data.og_image.url }
        />
        <meta property="og:image:width" content={ 600 }/>
        <meta property="og:image:height" content={ 314 }/>
      </Head>
      <MainComponent>
        {/*<img*/}
        {/*  srcSet="../../static/images/coming_soon/a_1080X1920_1.jpg 1080w,*/}
        {/*  ../../static/images/coming_soon/a_1280X1024.jpg 1280w,*/}
        {/*  ../../static/images/coming_soon/a_1366X768.jpg 1366w,*/}
        {/*  ../../static/images/coming_soon/a_1920X1080.jpg 1920w,*/}
        {/*  ../../static/images/coming_soon/a_2560X1440.jpg 2560w,*/}
        {/*  ../../static/images/coming_soon/a_5120X2880.jpg 5120w"*/}
        {/*  alt=""*/}
        {/*/>*/}
        {/*<style jsx>{ `*/}
        {/*img {*/}
        {/*  display: block;*/}
        {/*  width: 100vw;*/}
        {/*  height: 100vh;*/}
        {/*  object-fit: cover;*/}
        {/*  object-position: right;*/}
        {/*}*/}
        {/*` }</style>*/}

        { artistes && artiste &&
          <ArtistesList
            nextPage={ nextPage }
            prevPage={ prevPage }
            currentPage={ query }
            artists={ artiste }
            maxPage={ maxPage }
          />
        }

        {/* TODO renvoyer vers la page 1 des artistes, depuis le getInitialProps */ }
        {/*{ !artiste &&*/}
        {/*  <h1>PAS ARTISTES</h1>*/}
        {/*}*/}
      </MainComponent>
    </Fragment>
  );
};

Artistes.getInitialProps = async({ asPath, query }) => {
  const API = await Prismic.api(publicRuntimeConfig.prismic);
  const page = asPath.substring(15);
  const artistPerPages = 20;
  const artistQueryLength = 100;

  const artistes = await API.query(Prismic.Predicates.at('document.type', 'artists'), { lang: 'fr-FR' });
  const artiste = await iterArtist([], 1);

  const listIds = artistes.results[ 0 ].data.artists.map(item => item.artist.id);
  const allArtists = artiste.reduce((artist, current) => {
    if (listIds.includes(current.id)) { artist.push(current); }
    return artist;
  }, []);
  const pageLength = Math.ceil(allArtists.length / artistPerPages);

  const artistsToDisplay = allArtists.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 20);
    if (!resultArray[ chunkIndex ]) { resultArray[ chunkIndex ] = []; }
    resultArray[ chunkIndex ].push(item);
    return resultArray;
  }, []);

  async function iterArtist(artistes, nbPage) {
    const response = await callArtist(nbPage);
    artistes = artistes.concat(response.results);
    if (artistes.length === artistQueryLength * nbPage) {
      nbPage += 1;
      return await iterArtist(artistes, nbPage);
    }
    return artistes;
  }

  async function callArtist(page) {
    return await API.query(
      Prismic.Predicates.at('document.type', 'artist'), {
        lang     : 'fr-FR',
        orderings: '[my.artist.name]',
        pageSize : artistQueryLength,
        page
      }
    );
  }

  return {
    artistes: artistes.results[ 0 ],
    artiste : artistsToDisplay[ Number(page) - 1 ],
    allArtists,
    maxPage : Number(pageLength),
    query   : query.page ? Number(query.page) : Number(page)
  };
};

export default Artistes;
