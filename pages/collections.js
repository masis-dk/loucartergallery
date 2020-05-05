import React, { Fragment } from "react";
import MainComponent       from "../Components/Main/Main";
import Head                from 'next/head';
import Prismic             from "prismic-javascript";

import getConfig       from 'next/config';
import CollectionsList from "../Components/StylesPages/CollectionsList";

const { publicRuntimeConfig } = getConfig();

/**
 * @property { string } description_google
 * @property { string } og_image
 * @param collections
 * @param collectionsList
 * @returns {*}
 * @constructor
 */
const Collections = ( { collections, collectionsList } ) => {
  return (
    <Fragment>
      <Head>
        <title>{ collections.data.title[ 0 ].text }</title>
        <meta property="og:url" content="https://loucartergallery.com/eshop"/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content={ collections.data.description_google[ 0 ].text }/>
        <meta
          property="og:image:secure_url"
          content={ collections.data.og_image.url }
        />
        <meta
          property="og:image"
          content={ collections.data.og_image.url }
        />
        <meta property="og:image:width" content={ 600 }/>
        <meta property="og:image:height" content={ 314 }/>
      </Head>

      <MainComponent>
        {/* ************************************* */ }
        {/* ************************************* */ }

        {/* NE PAS EFFACER CE CODE */ }
        {/* NE PAS EFFACER CE CODE */ }
        {/* NE PAS EFFACER CE CODE */ }
        {/* NE PAS EFFACER CE CODE */ }

        {/*<img*/}
        {/*  srcSet="../static/images/collections/eshop_1080.jpg 1080w,*/}
        {/*  ../static/images/collections/eshop_1280.jpg 1280w,*/}
        {/*  ../static/images/collections/eshop_1366.jpg 1366w,*/}
        {/*  ../static/images/collections/eshop_1920.jpg 1920w,*/}
        {/*  ../static/images/collections/eshop_2560.jpg 2560w,*/}
        {/*  ../static/images/collections/eshop_5120.jpg 5120w"*/}
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

        {/* NE PAS EFFACER CE CODE */ }
        {/* NE PAS EFFACER CE CODE */ }
        {/* NE PAS EFFACER CE CODE */ }
        {/* NE PAS EFFACER CE CODE */ }

        {/* ************************************* */ }
        {/* ************************************* */ }

        <CollectionsList collectionsList={collectionsList}/>
      </MainComponent>
    </Fragment>
  )
};

Collections.getInitialProps = async () => {
  const API = await Prismic.api( publicRuntimeConfig.prismic );

  const eshop = await API.query(
    Prismic.Predicates.at( 'document.type', 'eshop' ), { lang: 'fr-FR' }
  );

  const collections = await API.query(
    Prismic.Predicates.at( 'document.type', 'collection' ), { lang: 'fr-FR' }
  );

  return { collections: eshop.results[ 0 ], collectionsList: collections.results  }
};

export default Collections;
