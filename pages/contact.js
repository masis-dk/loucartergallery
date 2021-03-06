import React, { Fragment } from 'react';
import Head                from 'next/head';
import Prismic             from 'prismic-javascript';
import getConfig           from 'next/config';

import ContactPage   from '../Components/StylesPages/ContactPage';
import MainComponent from '../Components/Main/Main';
import '../styles/style.scss';

const { publicRuntimeConfig } = getConfig();

const Contact = ({ data }) => (
  <Fragment>
    <Head>
      <title>Lou Carter Gallery - Contact</title>
    </Head>
    <MainComponent>
      <ContactPage result={ data }/>
    </MainComponent>
  </Fragment>
);

Contact.getInitialProps = async({ query }) => {
  const API = await Prismic.api(publicRuntimeConfig.prismic);
    const lang = query.lang === 'en' ? 'en-US' : 'fr-FR';
    const response = await API.query(Prismic.Predicates.at('document.type', 'contact'), { lang });
  const { data } = response.results[ 0 ];
  return { data };
};

export default Contact;
