import React, {Fragment, useEffect, useState} from 'react';
import Header from './Nav.style';
import {connect, useDispatch} from 'react-redux';
import {useRouter} from "next/router";

import Newsletter from './Newsletter.style';
import {navStatus} from '../../store/actions/nav.action';
import OutsideAlerter from '../../helpers/click-outside';
import COLORS from '../../helpers/colors';
import {validateEmail} from '../../helpers/functions';
import {subscribeToNews} from '../../helpers/mailchimp';

import { getOr } from 'lodash/fp';
import NavItems from "./navItems/NavItems";

const mapStateToProps = state => ({nav: state.nav.datas, navPosition: state.navPosition});

const Nav = ({nav, navPosition}) => {
  const dispatch = useDispatch();

  const [newsletter, toggleModal] = useState(false);
  const isNewsletter = param => {
    if (param) {
      toggleModal && openMenu(false);
      setEmail('');
      setSuccess('Partagez-nous votre adresse email pour être tenu informé de nos prochains événements');
      toggleModal(!newsletter);
      stateSubscribe(false);
      if (!newsletter) {
        dispatch(navStatus(!isOpen));
      }
    }
  };

  const [email, setEmail] = useState('');
  const handlerEmail = email => setEmail(email);

  const [success, setSuccess] = useState('Partagez-nous votre adresse email pour être tenu informé de nos prochains événements');
  const message = msg => setSuccess(msg);

  const [successState, setSuccessState] = useState(false);
  const stateSubscribe = state => setSuccessState(state);

  const [isLoding, setLoding] = useState(false);
  const stateLoding = state => setLoding(state);

  const onSubmit = async (event, email) => {
    event.preventDefault();
    stateLoding(true);
    if (!!email && validateEmail(email)) {
      subscribeToNews(email).then((response) => {
        // noinspection JSUnresolvedVariable
        if (!!response.data && (response.data.status === 200 || response.data.status === 'subscribed')) {
          message('Vous êtes bien inscrit à notre newsletter. Merci !');
        } else {
          message(response.data && response.data.title || 'Une erreur s\'est produite.');
        }
      }).catch((error) => {
        message(
          error && error.response && error.response.data && error.response.data.title || 'Une erreur s\'est produite.'
        );
      });
      stateSubscribe(true);
    } else {
      message('Votre adresse e-mail est erronée.');
    }
    stateLoding(false);
  };

  const [isOpen, openMenu] = useState(false);
  const toggleMenu = () => {
    openMenu(!isOpen);
    dispatch(navStatus(!isOpen));
  };

  /*const router = useRouter();

  function monUrl(lang) {
    return `/${lang}${router.pathname}${router.pathname.length > 1 ? '/' : ''}${router.query.slug || router.query.page || router.query.name || ''}`;
  }*/

  const menu = nav.reduce((acc, link) => {
    acc.push({
      title: link.data.title_group[0].text,
      links: link.data.group_link,
      subLinks: getOr([], 'data.group_link', link).find(subLink => subLink.data),
      order: link.data.order[0].text
    });

    return acc.sort((a, b) => a.order - b.order);
  }, []);

  const [ open, toggleList ] = useState(false);
  const [ index, setIndex ] = useState(null);
  const [ isSubListOpen, setSubListStatus ] = useState(false);

  useEffect(() => {
    setTimeout(() => toggleList(true));
  }, [ index ])

  const toggle = clickedItem => {
    setIndex(Number(clickedItem));
    toggleList(!open);
    setSubListStatus(false);
  }

  // noinspection JSUnresolvedVariable
  return (
    <Fragment>
      <OutsideAlerter method={toggleMenu} isActive={isOpen}>
        <Header style={{position: 'fixed'}} open={isOpen} navPos={navPosition.data}>

          {/*<ul style={ { position: 'absolute', bottom: 50, display: 'flex', left: '50%',  transform: 'translateX(-50%)' } }>
            <li style={ { margin: '0 5px' }}>
              <Link href={{ pathname: router.pathname, query: { ...router.query, lang: 'en' } }} as={monUrl('en')}>
                <a onClick={ toggleMenu }>en</a>
              </Link>
            </li>
             <li style={ { margin: '0 5px' }}>/</li>
            <li style={ { margin: '0 5px' }}>
              <Link href={{ pathname: router.pathname, query: { ...router.query, lang: 'fr' } }} as={monUrl('fr')}>
                <a onClick={ toggleMenu }>fr</a>
              </Link>
            </li>
          </ul>*/}

          <Header.Nav>

            {menu.map((links, i) =>
              <NavItems
                key={i}
                links={links}
                index={i}
                selectedIndex={index}
                onClick={toggle}
                open={open}
                isSubListOpen={isSubListOpen}
                setSubListStatus={setSubListStatus}
              />
            )}

          </Header.Nav>

          <Header.MenuBtn onClick={toggleMenu}>
            <Header.Burger open={isOpen}/>
          </Header.MenuBtn>
        </Header>
      </OutsideAlerter>

      <Newsletter newsletter={newsletter}>
        <Newsletter.Wrapper>
          <Newsletter.SuccessMessage>{success}</Newsletter.SuccessMessage>
          <Newsletter.CloseBtn onClick={() => isNewsletter(true)}>
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
              <path fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 0H9L5 4L1 0H0V1L4 5L0 9V10H1L5 6L9 10H10V9L6 5L10 1V0Z"
                    fill={COLORS.lightGrey}/>
            </svg>
          </Newsletter.CloseBtn>

          <Newsletter.Form onSubmit={e => onSubmit(e, email)}>
            <Newsletter.InputWrapper>
              <Newsletter.Label htmlFor="mail">Adresse e-mail :</Newsletter.Label>
              <Newsletter.InputEmail
                id="mail"
                type="email"
                placeholder="e-mail"
                onChange={(e) => handlerEmail(e.target.value)} value={email}
                color={COLORS.lightGrey}
              />
            </Newsletter.InputWrapper>

            {isLoding ? (<Newsletter.LdsRipple>
              <div/>
              <div/>
            </Newsletter.LdsRipple>) : (!successState ? (
              <Newsletter.SubmitBtn color={COLORS.lightGrey} type="submit" value="S'inscrire"/>
            ) : (
              <Newsletter.SubmitBtn
                color={COLORS.lightGrey}
                type="button"
                value="Fermer"
                onClick={() => isNewsletter(true)}
              />
            ))}
          </Newsletter.Form>
        </Newsletter.Wrapper>
      </Newsletter>

      <style jsx global>{`
      .head-wrapper {
        z-index: ${newsletter ? '51' : '50'};
      }
      `}</style>
    </Fragment>
  );
};

export default connect(mapStateToProps, navStatus)(Nav);
