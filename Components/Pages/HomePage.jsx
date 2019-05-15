import React, { Component, Fragment } from 'react';
import Slider from "react-slick";

const carousel = [
  {
    src: '../../static/images/homepage-white.jpg',
    alt: ''
  },
  {
    src: '../../static/images/homepage-lou.jpg',
    alt: ''
  }
];

class HomePage extends Component {
  state = {
    visible: 0
  };

  incrementFunction = () => {
    const { visible } = this.state;
    if (visible >= carousel.length - 1) {
      this.setState( { visible: 0 } );
      return;
    }
    this.setState( { visible: visible + 1 } );
  };

  decrementFunction = () => {
    const { visible } = this.state;
    if (visible <= 0) {
      this.setState( { visible: carousel.length - 1 } );
      return;
    }
    this.setState( { visible: visible - 1 } );
  };

  render() {

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      swipe: false,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2500
          }
        }
      ]
    };

    return (
      <Fragment>

        <div className="home-image-wrapper">

          <div className="image-wrapper">
            <Slider { ...settings }>
            { carousel.map( ( img, i ) => (
              <div key={ i } style={{ position: 'relative' }}>
                <img
                  src={ img.src }
                  alt=""
                />
              </div>
            ) ) }
            </Slider>
          </div>

        </div>

      </Fragment>
    );
  }
}

export default HomePage;
